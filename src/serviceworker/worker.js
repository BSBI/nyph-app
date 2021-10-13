// service worker for Nyph app

// currently based around the 'Cache and update' recipe along with many modifications
// see https://serviceworke.rs

//import "@babel/polyfill";
import localforage from 'localforage';
import {ResponseFactory} from "./responses/ResponseFactory";
import {ImageResponse} from "./responses/ImageResponse";
import {packageClientResponse} from "./packageClientResponse";
import {SurveyResponse} from "./responses/SurveyResponse";
import {OccurrenceResponse} from "./responses/OccurrenceResponse";
import {OccurrenceImage} from "../models/OccurrenceImage";
import {Model} from "../models/Model";
//import {VERSION} from "rollup";

if (!Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
        return this.then(callback)
            .catch(callback);
    };
}

ImageResponse.register();
SurveyResponse.register();
OccurrenceResponse.register();

const CACHE_VERSION = `version-VERSION`;

const POST_PASS_THROUGH_WHITELIST = /^https:\/\/nyphtest\.bsbi\.org\/loadsurveys.php/;

localforage.config({
    name: 'NYPH App'
});

// On install, cache some resources.
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');

    self.skipWaiting();

    // Ask the service worker to keep installing until the returning promise
    // resolves.
    evt.waitUntil(
        precache()
            // see https://serviceworke.rs/immediate-claim_service-worker_doc.html
            .then(() => self.skipWaiting()));
});

self.addEventListener('activate', function(event) {
    self.clients.matchAll({
        includeUncontrolled: true
    }).then(function(clientList) {
        const urls = clientList.map(function(client) {
            return client.url;
        });
        console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                if (cacheName !== CACHE_VERSION) {
                    console.log('[ServiceWorker] Deleting old cache:', cacheName);
                    return caches.delete(cacheName);
                }
            })
        );
    }).then(function() {
            console.log('[ServiceWorker] Claiming clients for version', CACHE_VERSION);
            return self.clients.claim();
        })
    );
});


// // see https://davidwalsh.name/background-sync
// // https://developers.google.com/web/updates/2015/12/background-sync
// self.addEventListener('sync', function(event) {
//
// });

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', /** @param {FetchEvent} evt */ function (evt) {
    console.log(`The service worker is serving: '${evt.request.url}'`);

    evt.preventDefault();

    if (evt.request.method === 'POST') {
        console.log(`Got a post request`);

        if (evt.request.url.match(POST_PASS_THROUGH_WHITELIST)) {
            console.log(`Passing through whitelisted post request for: ${evt.request.url}`);
            evt.respondWith(fetch(evt.request));
        } else {
            let clonedRequest;
            try {
                clonedRequest = evt.request.clone();
            } catch (e) {
                console.log('Failed to clone request.');
                console.log({'Cloning error' : e});
            }

            evt.respondWith(fetch(evt.request).then((response) => {
                // would get here if the server responds at all, but need to check that the response is ok (not a server error)
                if (response.ok) {
                    return Promise.resolve(response)
                        .then((response) => {
                            // save the response locally
                            // before returning it to the client

                            return response.clone().json();
                        })
                        .then((jsonResponseData) => {
                            return ResponseFactory
                                .fromPostResponse(jsonResponseData)
                                .setPrebuiltResponse(response)
                                .populateLocalSave()
                                .storeLocally();
                        })
                        .catch((error) => {
                            // for some reason local storage failed, after a successful server save
                            console.log({error});

                            return Promise.resolve(response); // pass through the server response
                        });
                } else {
                    console.log(`Failed to save, moving on to attempt IndexedDb`);
                    return Promise.reject('Failed to save to server.');
                }
            })
            .catch((reason) => {
                // would get here if the network is down
                // or if got invalid response from the server

                console.log(`post fetch failed (probably no network), (reason: ${reason})`);
                //console.log({'post failure reason' : reason});

                // /**
                //  * simulated result of post, returned as JSON body
                //  * @type {{surveyId: string, occurrenceId: string, imageId: string, saveState: string, [error]: string, [errorHelp]: string}}
                //  */
                // let returnedToClient = {};

                return clonedRequest.formData()
                    .then((formData) => {
                            //console.log('got to form data handler');
                            //console.log({formData});

                            return ResponseFactory
                                .fromPostedData(formData)
                                .populateClientResponse()
                                .storeLocally();
                        }, reason => {
                            console.log('failed to read form data locally');
                            console.log({reason});

                            /**
                             * simulated result of post, returned as JSON body
                             * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
                             */
                            let returnedToClient = {
                                error: 'Failed to process posted response data. (internal error)',
                                errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' +
                                    'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' +
                                    'Please try to re-establish a network connection and try again.'
                            };

                            return packageClientResponse(returnedToClient);
                        }
                    );
            }));
        }
    } else {
        // test whether this is a direct link in to a page that should be substituted by
        // the single page app
        if (evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\//) &&
            evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app$/) &&
            !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/nyph\.js/) &&
            !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/serviceworker\.js/) &&
            !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/manifest\.webmanifest/) &&
            !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/index\.html/)
        ) {
            // serving single page app instead
            console.log('redirecting to the root of the SPA');
            let spaRequest = new Request('https://nyphtest.bsbi.org/app/index.html');
            evt.respondWith(fromCache(spaRequest));
            evt.waitUntil(update(spaRequest));
        } else if (evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/image\.php/)) {
            handleImageFetch(evt);
        } else {

            // You can use `respondWith()` to answer immediately, without waiting for the
            // network response to reach the service worker...
            evt.respondWith(fromCache(evt.request));
            // ...and `waitUntil()` to prevent the worker from being killed until the
            // cache is updated.
            evt.waitUntil(update(evt.request));
        }
    }
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.addAll([
            './index.html',
            './manifest.webmanifest',
            //'./nyph.js',
            '/appcss/app.css', // note no leading '.' - this is an absolute path
            '/img/NyphLogo_900x431.png',
            '/img/icons/favicon-32x32.png',
            '/img/icons/favicon-16x16.png',
            '/img/icons/favicon-196x196.png',
            'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
            'https://database.bsbi.org/js/taxonnames.js.php',
            'https://code.jquery.com/jquery-3.3.1.slim.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js'
        ]);
    });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
    // @todo need to serve index.html in place of all navigo-served pages
    // (an issue if someone returns to a bookmarked page within the app)

    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.match(request).then(function (matching) {
            console.log(matching ?
                `matched ${request.url}`
                :
                `no match for ${request.url}`);

            return matching || fetch(request); // return cache match or if not cached then go out to network
        });
    });
}

/**
 * Special case response for images
 * attempt to serve from local cache first,
 * if that fails then go out to network
 * finally see if there is an image in indexeddb
 *
 * @param {FetchEvent} evt
 */
function handleImageFetch(evt) {
    evt.respondWith(fromCache(evt.request).then((response) => {
        if (response) {
            return response;
        } else {
            // not cached and no network access
            // try to respond from local storage

            const url = evt.request.url;
            const matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);

            if (matches) {
                const imageId = matches[1];

                return imageFromLocalDatabase(imageId);
            } else {
                console.log(`Failed to match image id in url '${url}'`);
            }
        }
    }));
}

/**
 *
 * @param {string} imageId
 * @returns {Promise}
 */
function imageFromLocalDatabase(imageId) {
    const image = new OccurrenceImage();

    console.log('attempting retrieval of image data from local database');

    return Model.retrieveFromLocal(imageId, image).then((image) => {
        console.log(`Retrieved image '${imageId}' from indexeddb.`);
        if (image.file) {
            const headers = new Headers();
            headers.append('Content-Type', image.file.type);

            return new Response(image.file, {
                "status" : 200 ,
                "statusText" : "OK image response from IndexedDb"
            });
        } else {
            console.log(`No local file object associated with retrieved image '${imageId}' from indexeddb.`);
        }
    });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
    request = new Request(request, {mode: 'cors', credentials: 'omit'});

    return caches.open(CACHE_VERSION).then(function (cache) {
        return fetch(request, {cache: "no-cache"}).then(function (response) {
            if (response.ok) {
                return cache.put(request, response);
            } else {
                console.log(`Request during cache update failed for ${request.url}`);
                console.log({'failed cache response' : response});
                return Promise.reject('Request during cache update failed, not caching.');
            }
        }).catch((error) => {
            console.log(`Cache attempt failed for ${request.url}: error was ${error}`);
        });
    });
}
