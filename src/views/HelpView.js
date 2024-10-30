// Help page
/** @type {string} htmlContent */
import htmlContent from "../templates/helpPage.html";
import {Page} from "bsbi-app-framework-view";

export class HelpView extends Page {

    body() {
        // at this point the entire content of #body should be safe to replace

        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = `${htmlContent}<p>Version __BSBI_APP_VERSION__</p>`;
    }
}
