// Help page

import {Page} from "./Page";
import htmlContent from "../templates/helpPage.html";
//import {VERSION} from "rollup";

export class HelpView extends Page {

    body() {
        // at this point the entire content of #body should be safe to replace

        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = htmlContent + `<p>Version VERSION</p>`;
    }
}
