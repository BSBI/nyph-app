navigator.serviceWorker&&navigator.serviceWorker.getRegistration(`/${pathPrefix}/serviceworker.mjs`).then((e=>{console.log(e?"Have existing service worker":"No current service worker"),e&&e.unregister()}));
//# sourceMappingURL=app.mjs.map
