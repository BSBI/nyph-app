// not found view

import {Page} from "./Page";

export class NotFoundView extends Page {
    body() {
        // at this point the entire content of #body should be safe to replace

        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = `<h2>Page not found</h2><p><a href="/app/list">Return to the homepage.</a>`;
    }
}