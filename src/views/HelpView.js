// Help page

//import {Page} from "./Page";
import htmlContent from "../templates/helpPage.html";
import {Page} from "bsbi-app-framework";
//import {VERSION} from "rollup";

export class HelpView extends Page {

    body() {
        // at this point the entire content of #body should be safe to replace

        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = htmlContent + `<p>Version VERSION</p>`;
    }
}
