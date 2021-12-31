// service worker for Nyph app

// based around the 'Cache and update' recipe along with many modifications
// see https://serviceworke.rs


//import {VERSION} from "rollup";

import {BSBIServiceWorker} from "bsbi-app-framework";
import {NyphApp} from "../framework/NyphApp";

// noinspection JSUnusedLocalSymbols
let BsbiDb = BsbiDb || {scriptVersions: { TaxonNames : [] } };

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = location.pathname.split('/')[1];

// kill after 2022-03-01 to prevent the app perpetuating itself
if ((new Date).toJSON().slice(0,10) >= '2022-03-01') {
    throw new Error("Built-in expiry date has past for NYPH.");
}

const serviceWorker = new BSBIServiceWorker();
serviceWorker.initialise({
    forageName : NyphApp.forageName,

    postPassThroughWhitelist : /^https:\/\/__DOMAIN_REGEX__\/loadsurveys.php|^https:\/\/browser-update\.org/,
    postImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/saveimage.php/,
    getImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/image\.php/,
    interceptUrlMatches : new RegExp(`^https://__DOMAIN_REGEX__/${pathPrefix}/|^https://__DOMAIN_REGEX__/${pathPrefix}$`),
    ignoreUrlMatches : new RegExp(`^https://__DOMAIN_REGEX__/${pathPrefix}/app\.js|^https://__DOMAIN_REGEX__/${pathPrefix}/serviceworker\.js|^https://__DOMAIN_REGEX__/${pathPrefix}/manifest\.webmanifest|^https://__DOMAIN_REGEX__/${pathPrefix}/index\.html|^https://api\.mapbox\.com`),
    indexUrl : `https://__DOMAIN__/${pathPrefix}/index.html`,

    // postPassThroughWhitelist : /^https:\/\/__DOMAIN_REGEX__\/loadsurveys.php/,
    // postImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/saveimage.php/,
    // getImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/image\.php/,
    // interceptUrlMatches : /^https:\/\/__DOMAIN_REGEX__\/app\/|^https:\/\/__DOMAIN_REGEX__\/app$/,
    // ignoreUrlMatches : /^https:\/\/__DOMAIN_REGEX__\/app\/app\.js|^https:\/\/__DOMAIN_REGEX__\/app\/serviceworker\.js|^https:\/\/__DOMAIN_REGEX__\/app\/manifest\.webmanifest|^https:\/\/__DOMAIN_REGEX__\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
    // indexUrl : 'https://__DOMAIN__/app/index.html',

    urlCacheSet : [
        './index.html',
        './manifest.webmanifest',
        '/appcss/app.2021-12-16.css', // note no leading '.' - this is an absolute path
        '/appcss/theme.css',
        //'/img/gwh_logo1_tsp.png',
        '/img/icons/favicon-32x32.png',
        '/img/icons/favicon-16x16.png',
        '/img/icons/android-icon-192x192.png',
        //'/img/icons/gwh_logo1_tsp-512x512.png',
        '/img/BSBIlong.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
        '/js/taxonnames.js.php',
        //'https://database.bsbi.org/js/taxonnames.js.php',
        'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
        'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap',
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js',
    ],
    passThroughNoCache : /^https:\/\/api\.mapbox\.com|^https:\/\/events\.mapbox\.com/,
    version : 'VERSION'
});
