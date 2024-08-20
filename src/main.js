// version __BSBI_APP_VERSION__

import {NyphApp} from './framework/NyphApp';
import {MainController} from "./controllers/MainController";
import {MainView} from "./views/MainView";
import {HelpView} from "./views/HelpView";
import {NyphLayout} from "./views/layout/NyphLayout";
import mapboxglSupported from "@mapbox/mapbox-gl-supported";
import mapboxgl from 'mapbox-gl';
import './theme.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './app.css';
import 'bsbi-app-framework-view/dist/css.css';
import 'dialog-polyfill/dist/dialog-polyfill.css';
import {Logger, Model, StaticContentController, SurveyPickerController, Taxon} from "bsbi-app-framework";
import {
    doubleClickIntercepted,
    NotFoundView,
    OccurrenceValidation,
    PatchedNavigo,
    SurveyPickerView, TextGeorefField
} from "bsbi-app-framework-view";
import Tab from "bootstrap/js/dist/tab";
import Popover from "bootstrap/js/dist/popover";
import Dropdown from "bootstrap/js/dist/dropdown";

import taxa from "https://staticdatabase.bsbi.org/js/nyphtaxaexpanded.mjs";

//Taxon.setTaxa(taxa);
Taxon.initialiseTaxa(taxa, "https://staticdatabase.bsbi.org/js/nyphtaxaexpanded.mjs");

let haveExistingWorker;
let appStarted = false;

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = window.location.pathname.split('/')[1];

console.log({pathPrefix});

window.onerror = Logger.logError;

TextGeorefField.ignoreSurveyBounds = true;

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
        console.log(haveExistingWorker ? 'Have existing service worker' : 'No current service worker');
    }).then(() => {
        // Register the ServiceWorker limiting its action to those URLs starting
        // by 'controlled'. The scope is not a path but a prefix. First, it is
        // converted into an absolute URL, then used to determine if a page is
        // controlled by testing it is a prefix of the request URL.
        navigator.serviceWorker.register(`/${pathPrefix}/serviceworker.mjs`, {
            type: 'module'
        }).then(reg => {
            NyphApp.serviceWorkerRegistration = reg;

            if (haveExistingWorker) {
                // only show worker change dialog if this is a replacement rather than a first time registration

                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    // if online, prompt a reload if the app is likely to have a network connection
                    // (service work refresh might have happened previously, but without capturing all the resources needed)
                    if (navigator.onLine) {

                        if (appStarted) {
                            const dialog = document.getElementById('appUpdateDialog');

                            if (dialog) {
                                dialogPolyfill.registerDialog(dialog);

                                const cancelDialogEl = document.getElementById('appUpdateDialogCancel');
                                cancelDialogEl && cancelDialogEl.addEventListener("click", () => {
                                    dialog.close();
                                });

                                const updateDialogEl = document.getElementById('appUpdateDialogInstall');
                                updateDialogEl && updateDialogEl.addEventListener("click", () => {
                                    dialog.close();
                                    window.location.reload();
                                });

                                dialog.open || dialog.showModal();
                            } else {
                                // dialog might not be available if the window has been corrupted and is displaying
                                // a basic error message

                                // in which case just go ahead with a reload that might fix the problem
                                window.location.reload();
                            }
                        } else {
                            // if the app hasn't started yet (was just being opened)
                            // then can update immediately without a prompt
                            window.location.reload();
                        }
                    }


                    // const dialog = document.getElementById('appUpdateDialog');
                    //
                    // document.getElementById('appUpdateDialogCancel')?.addEventListener?.("click", () => {
                    //     dialog.close();
                    // });
                    //
                    // document.getElementById('appUpdateDialogInstall')?.addEventListener?.("click", () => {
                    //     dialog.close();
                    //     window.location.reload();
                    // });
                    //
                    // dialog.open || dialog.showModal();
                });
            }
        });
    });
    //}
}

Model.bsbiAppVersion = '__BSBI_APP_VERSION__';

const app = new NyphApp;
app.notFoundViewObject = new NotFoundView();

Logger.app = app;

app.router = new PatchedNavigo(`https://__DOMAIN__/${pathPrefix}/`);

app.containerId = 'appcontainer';
app.setLayout(new NyphLayout());

OccurrenceValidation.app = app;

app.registerController(new StaticContentController(new HelpView, '/help'));
app.registerController(new MainController(new MainView));
app.registerController(new SurveyPickerController(new SurveyPickerView));

app.setLocalForageName(NyphApp.forageName);

if (mapboxglSupported.supported()) {
    mapboxgl.prewarm();
}

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

    document.body.classList.remove('loading');
    appStarted = true;
});

let updateLinkEl = document.getElementById('updateLink');
if (updateLinkEl) {
    updateLinkEl.addEventListener('click', (event) => {
        if (!doubleClickIntercepted(event)) {
            console.log('Checking for update');

            document.body.classList.add('updating');
            NyphApp.serviceWorkerRegistration && NyphApp.serviceWorkerRegistration.update().finally(() => {
                document.body.classList.remove('updating');
            });
        }

        if (!doubleClickIntercepted(event)) {
            console.log('Checking for update');

            document.body.classList.add('updating');
            NyphApp.serviceWorkerRegistration && NyphApp.serviceWorkerRegistration.update().finally(() => {
                document.body.classList.remove('updating');
            });
        }

        event.preventDefault();
        event.stopPropagation();
    });
}
