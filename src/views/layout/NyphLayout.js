// Overall page layout for NYPH app

import {Layout} from "bsbi-app-framework-view";
import nyphNewSurveyModal from "../../templates/nyphNewSurveyModal.html";

export class NyphLayout extends Layout {
    /**
     * @type {string}
     */
    surveysMenuId = 'surveysmenu';

    /**
     * this also needs to be edited in index.html
     *
     * @type {string}
     */
    newSurveyLabel = 'start new list';

    newSurveyContent = nyphNewSurveyModal;
}
