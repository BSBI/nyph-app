// Survey picker page

import {Page} from "./Page";
//import htmlContent from "../templates/helpPage.html";

export class SurveyPickerView extends Page {

    body() {
        // at this point the entire content of #body should be safe to replace

        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = '<p>Placeholder survey picker content.</p>';
    }
}
