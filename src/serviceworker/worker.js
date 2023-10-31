// service worker for Nyph app

// based around the 'Cache and update' recipe along with many modifications
// see https://serviceworke.rs

'use strict';

import {BSBIServiceWorker} from "bsbi-app-framework";
import {FORAGE_NAME} from "../framework/NyphApp";

// noinspection JSUnusedLocalSymbols,ES6ConvertVarToLetConst
//var BsbiDb = BsbiDb || {scriptVersions: { TaxonNames : [] } };

// mainly aiming to determine whether '/app/' or '/testapp/'
let pathPrefix = location.pathname.split('/')[1];

// kill after 2023-03-01 to prevent the app perpetuating itself
// if ((new Date).toJSON().slice(0,10) >= '2023-03-01') {
//     throw new Error("Built-in expiry date has passed for NYPH.");
// }

const serviceWorker = new BSBIServiceWorker();
serviceWorker.initialise({
    forageName : FORAGE_NAME,

    postPassThroughWhitelist : /^https:\/\/__DOMAIN_REGEX__\/loadsurveys.php|^https:\/\/__DOMAIN_REGEX__\/javascriptErrorLog\.php/,
    postImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/saveimage.php/,
    getImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/image\.php/,
    interceptUrlMatches : new RegExp(`^https://__DOMAIN_REGEX__/${pathPrefix}/|^https://__DOMAIN_REGEX__/${pathPrefix}$`),
    ignoreUrlMatches : new RegExp(`^https://__DOMAIN_REGEX__/${pathPrefix}/app\.m?js|^https://__DOMAIN_REGEX__/${pathPrefix}/serviceworker\.m?js|^https://__DOMAIN_REGEX__/${pathPrefix}/manifest\.webmanifest|^https://__DOMAIN_REGEX__/${pathPrefix}/index\.html|^https://api\.mapbox\.com`),
    staticUrlMatches : /(?:^https:\/\/(?:staticdatabase\.bsbi\.org|fonts\.googleapis\.com|fonts\.gstatic\.com)|\.(?:png|svg|ico|m?js)$)/,
    indexUrl : `https://__DOMAIN__/${pathPrefix}/index.html`,

    // postPassThroughWhitelist : /^https:\/\/__DOMAIN_REGEX__\/loadsurveys.php/,
    // postImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/saveimage.php/,
    // getImageUrlMatch : /^https:\/\/__DOMAIN_REGEX__\/image\.php/,
    // interceptUrlMatches : /^https:\/\/__DOMAIN_REGEX__\/app\/|^https:\/\/__DOMAIN_REGEX__\/app$/,
    // ignoreUrlMatches : /^https:\/\/__DOMAIN_REGEX__\/app\/app\.js|^https:\/\/__DOMAIN_REGEX__\/app\/serviceworker\.js|^https:\/\/__DOMAIN_REGEX__\/app\/manifest\.webmanifest|^https:\/\/__DOMAIN_REGEX__\/app\/index\.html|^https:\/\/api\.mapbox\.com/,
    // indexUrl : 'https://__DOMAIN__/app/index.html',

    urlCacheSet : [
        './index.html',
        './app.mjs?version=__BSBI_APP_VERSION__',
        './manifest.webmanifest',
        '/appcss/app.__BSBI_APP_VERSION__.css', // note no leading '.' - this is an absolute path
        //'/appcss/theme.css',
        //'/img/gwh_logo1_tsp.png',
        '/img/icons/favicon-32x32.png',
        '/img/icons/favicon-16x16.png',
        '/img/icons/android-icon-192x192.png',
        '/img/nyph_final@2x.png',
        //'/img/icons/gwh_logo1_tsp-512x512.png',
        //'/img/BSBIlong.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
        //'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        //'/js/taxonnames.js.php',
        'https://staticdatabase.bsbi.org/js/taxaexpanded.mjs',
        //'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        //'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
        //'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap',
        // am not caching files under api.mapbox.com
        // so instead serve this locally
        //'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js',
        //'/js/mapbox-gl-geocoder-v4.7.2.min.js'
    ],
    passThroughNoCache : /^https:\/\/api\.mapbox\.com|^https:\/\/events\.mapbox\.com|^https:\/\/browser-update\.org/,
    version : '__BSBI_APP_VERSION__',
    dataVersion : '__BSBI_APP_DATA_VERSION__'
});
