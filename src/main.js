// version __BSBI_APP_VERSION__

import './theme.scss';
import './app.css';
import 'bsbi-app-framework-view/dist/css.css';
import 'dialog-polyfill/dist/dialog-polyfill.css';

if (navigator.serviceWorker) {

    // kill after 2023-03-01 to prevent the app perpetuating itself
    // if ((new Date).toJSON().slice(0,10) >= '2023-03-01') {
    //     navigator.serviceWorker.getRegistrations().then(function(registrations) {
    //         for(let registration of registrations) {
    //             registration.unregister();
    //         } });
    // } else {
    navigator.serviceWorker.getRegistration(`/${pathPrefix}/serviceworker.mjs`)
        .then((registration) => {
            console.log(registration ? 'Have existing service worker' : 'No current service worker');

            if (registration) {
                registration.unregister();
            }
        });
}
