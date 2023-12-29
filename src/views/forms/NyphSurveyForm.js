import {SurveyForm} from "bsbi-app-framework-view";
import {NyphSurveyFormSection} from "./NyphSurveyFormSection";

export class NyphSurveyForm extends SurveyForm {

    /**
     * sections keyed by numerical order
     *
     * @type {Array.<typeof NyphSurveyFormSection>}
     */
    static sections = [];

    /**
     *
     * @type {Object.<string, typeof NyphSurveyFormSection>}
     */
    static sectionsByKey = {};

    /**
     *
     * @param {typeof NyphSurveyFormSection} formClass
     */
    static registerSection(formClass) {
        NyphSurveyForm.sections[formClass.sectionSortOrder] = formClass;
        NyphSurveyForm.sectionsByKey[formClass.sectionNavigationKey] = formClass;
    }
}

