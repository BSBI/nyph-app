// version VERSION

import {NyphApp} from './framework/NyphApp';
import {MainController} from "./controllers/MainController";
import {MainView} from "./views/MainView";
import {HelpView} from "./views/HelpView";
import {NyphLayout} from "./views/layout/NyphLayout";
import './theme.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// polyfill stuff
import "core-js/stable";
//import 'element-closest-polyfill'; // still needed for IE11
//import 'whatwg-fetch';
import {PatchedNavigo, StaticContentController, TaxaLoadedHook, SurveyPickerController, SurveyPickerView} from "bsbi-app-framework";

// work around Edge bug
// if (!Promise.prototype.finally) {
//     Promise.prototype.finally = function(callback) {
//         return this.then(callback)
//             .catch(callback);
//     };
// }

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');
// console.log(GridRef.from_string('SD59'));

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = window.location.pathname.split('/')[1];

console.log({pathPrefix});

if (navigator.serviceWorker) {
    // Register the ServiceWorker limiting its action to those URL starting
    // by 'controlled'. The scope is not a path but a prefix. First, it is
    // converted into an absolute URL, then used to determine if a page is
    // controlled by testing it is a prefix of the request URL.
    navigator.serviceWorker.register(`/${pathPrefix}/serviceworker.js`, {
        // scope: './controlled'
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload(true);
    });
}

const app = new NyphApp;

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
    TaxaLoadedHook.onceTaxaLoaded()
        .then(() => {
            app.initialise();
            app.display();
        });
});
