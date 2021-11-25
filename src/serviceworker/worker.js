// service worker for Nyph app

// currently based around the 'Cache and update' recipe along with many modifications
// see https://serviceworke.rs


//import {VERSION} from "rollup";

import {BSBIServiceWorker} from "bsbi-app-framework";
import {NyphApp} from "../framework/NyphApp";

// noinspection JSUnusedLocalSymbols
let BsbiDb = BsbiDb || {scriptVersions: { TaxonNames : [] } };

const serviceWorker = new BSBIServiceWorker();
serviceWorker.initialise({
    forageName : NyphApp.forageName,
    postPassThroughWhitelist : /^https:\/\/nyphtest\.bsbi\.org\/loadsurveys.php/,
    postImageUrlMatch : /^https:\/\/nyphtest\.bsbi\.org\/saveimage.php/,
    getImageUrlMatch : /^https:\/\/nyphtest\.bsbi\.org\/image\.php/,
    interceptUrlMatches : /^https:\/\/nyphtest\.bsbi\.org\/app\/|^https:\/\/nyphtest\.bsbi\.org\/app$/,
    ignoreUrlMatches : /^https:\/\/nyphtest\.bsbi\.org\/app\/app\.js|^https:\/\/nyphtest\.bsbi\.org\/app\/serviceworker\.js|^https:\/\/nyphtest\.bsbi\.org\/app\/manifest\.webmanifest|^https:\/\/nyphtest\.bsbi\.org\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
    indexUrl : 'https://nyphtest.bsbi.org/app/index.html',
    urlCacheSet : [
        './index.html',
        './manifest.webmanifest',
        '/appcss/app.css', // note no leading '.' - this is an absolute path
        '/appcss/theme.css',
        //'/img/gwh_logo1_tsp.png',
        '/img/icons/favicon-32x32.png',
        '/img/icons/favicon-16x16.png',
        '/img/icons/android-icon-192x192.png',
        //'/img/icons/gwh_logo1_tsp-512x512.png',
        '/img/BSBIlong.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
        'https://database.bsbi.org/js/taxonnames.js.php',
        'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
        'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap',
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js'
    ],
    passThroughNoCache : /^https:\/\/api\.mapbox\.com|^https:\/\/events\.mapbox\.com/,
    version : 'VERSION'
});
