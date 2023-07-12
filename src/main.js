// version __BSBI_APP_VERSION__

import {NyphApp} from './framework/NyphApp';
import {MainController} from "./controllers/MainController";
import {MainView} from "./views/MainView";
import {HelpView} from "./views/HelpView";
import {NyphLayout} from "./views/layout/NyphLayout";
import './theme.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './app.css';
import 'bsbi-app-framework-view/dist/css.css';
import {StaticContentController, SurveyPickerController, Taxon} from "bsbi-app-framework";
import {doubleClickIntercepted, NotFoundView, PatchedNavigo, SurveyPickerView} from "bsbi-app-framework-view";
//import 'bootstrap';
import Tab from "bootstrap/js/dist/tab";
import Popover from "bootstrap/js/dist/popover";
import taxa from "https://staticdatabase.bsbi.org/js/taxonnames.mjs.php";

//Taxon.setTaxa(taxa);
Taxon.initialiseTaxa(taxa, "https://staticdatabase.bsbi.org/js/taxonnames.mjs.php");

// work around Edge bug
// if (!Promise.prototype.finally) {
//     Promise.prototype.finally = function(callback) {
//         return this.then(callback)
//             .catch(callback);
//     };
// }

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
//console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

/**
 * @type {ServiceWorkerRegistration}
 */
let serviceWorkerRegistration;
let haveExistingWorker;

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = window.location.pathname.split('/')[1];

console.log({pathPrefix});

if (navigator.serviceWorker) {

    // kill after 2023-03-01 to prevent the app perpetuating itself
    // if ((new Date).toJSON().slice(0,10) >= '2023-03-01') {
    //     navigator.serviceWorker.getRegistrations().then(function(registrations) {
    //         for(let registration of registrations) {
    //             registration.unregister();
    //         } });
    // } else {
    navigator.serviceWorker.getRegistration(`/${pathPrefix}/serviceworker.mjs`).then((registration) => {
        haveExistingWorker = !!registration;
        console.log(haveExistingWorker ? 'Have existing sevice worker' : 'No current service worker');
    }).then(() => {
        // Register the ServiceWorker limiting its action to those URLs starting
        // by 'controlled'. The scope is not a path but a prefix. First, it is
        // converted into an absolute URL, then used to determine if a page is
        // controlled by testing it is a prefix of the request URL.
        navigator.serviceWorker.register(`/${pathPrefix}/serviceworker.mjs`, {
            type: 'module'
            // scope: './controlled'
        }).then(reg => {
            serviceWorkerRegistration = reg;

            if (haveExistingWorker) {
                // only show worker change dialog if this is a replacement rather than a first time registration

                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    const dialog = document.getElementById('appUpdateDialog');

                    document.getElementById('appUpdateDialogCancel').addEventListener("click", () => {
                        dialog.close();
                    });

                    document.getElementById('appUpdateDialogInstall').addEventListener("click", () => {
                        dialog.close();
                        window.location.reload();
                    });

                    dialog.open || dialog.showModal();
                });
            }
        });
    });
    //}
}

const app = new NyphApp;
app.notFoundViewObject = new NotFoundView();

app.router = new PatchedNavigo(`https://__DOMAIN__/${pathPrefix}/`);

app.containerId = 'appcontainer';
app.setLayout(new NyphLayout());


app.registerController(new StaticContentController(new HelpView, '/help'));
app.registerController(new MainController(new MainView));
app.registerController(new SurveyPickerController(new SurveyPickerView));

app.setLocalForageName(NyphApp.forageName);

// test detection of cameras
// see https://stackoverflow.com/questions/23288918/check-if-user-has-webcam-or-not-using-javascript-only
// navigator.mediaDevices.enumerateDevices()
//     .then(function(devices) {
//         devices.forEach(function(device) {
//             console.log(device.kind + ": " + device.label +
//                 " id = " + device.deviceId);
//         });
//     });

app.restoreOccurrences().then((result) => {
    console.log({'result from restoreOccurrences' : result});},
    (result) => {
            console.log({'failed result from restoreOccurrences' : result});
}).finally(() => {
    // the taxon list may be slow to load
    // TaxaLoadedHook.onceTaxaLoaded()
    //     .then(() => {
    //         app.initialise();
    //         app.display();
    //     });

    app.initialise();
    app.display();
});

let updateLinkEl = document.getElementById('updateLink');
if (updateLinkEl) {
    updateLinkEl.addEventListener('click', (event) => {
        if (!doubleClickIntercepted(event)) {
            console.log('Checking for update');
            serviceWorkerRegistration?.update();
        }

        event.preventDefault();
        event.stopPropagation();
    });
}
