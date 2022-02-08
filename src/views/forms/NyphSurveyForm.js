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

    // /**
    //  * @type {Survey}
    //  */
    // #survey;

    // _formFieldsBuilt = false;

    // /**
    //  * @type {typeof NyphSurveyFormSection}
    //  */
    // section;

    // /**
    //  *
    //  * @param {typeof NyphSurveyFormSection} section
    //  */
    // constructor(section) {
    //     super(section);
    // }

    // /**
    //  *
    //  * @returns {HTMLElement}
    //  */
    // get formElement() {
    //     let el = super.formElement;
    //
    //     if (!this._formFieldsBuilt) {
    //         this.buildFormFields();
    //     }
    //
    //     return el;
    // }

    // updateModelFromContent() {
    //     console.log('updating survey from NyphSurveyForm content');
    //
    //     for (let key in this.fields) {
    //         if (this.fields.hasOwnProperty(key)) {
    //             let field = this.fields[key];
    //
    //             this.#survey.attributes[key] = field.value;
    //         }
    //     }
    //
    //     console.log({survey: this.#survey});
    // }

    // /**
    //  *
    //  * @param {Survey} model
    //  */
    // set model (model) {
    //     this.#survey = model;
    //     this.populateFormContent();
    // }

    // get model() {
    //     return this.#survey;
    // }

    // /**
    //  * the change event triggers after a field has changed, before the value has been read back into the model
    //  *
    //  * @param params
    //  */
    // changeHandler(params) {
    //     console.log('survey form change event');
    //     console.log({params});
    //
    //     this.fireEvent(SurveyForm.CHANGE_EVENT, {form: this});
    // }

    // destructor() {
    //     super.destructor();
    //     this.#survey = null;
    // }

    /**
     *
     * @param {typeof NyphSurveyFormSection} formClass
     */
    static registerSection(formClass) {
        NyphSurveyForm.sections[formClass.sectionSortOrder] = formClass;
        NyphSurveyForm.sectionsByKey[formClass.sectionNavigationKey] = formClass;
    }

    // /**
    //  *
    //  */
    // initialiseFormFields() {
    //     const properties = this.section.properties;
    //
    //     this.fields = {};
    //
    //     for (let key in properties) {
    //         if (properties.hasOwnProperty(key)) {
    //             // noinspection JSPotentiallyInvalidConstructorUsage
    //             this.fields[key] = new properties[key].field(properties[key].attributes);
    //         }
    //     }
    // }

    // getFormSectionProperties() {
    //     return this.section.properties;
    // }
}

// NyphSurveyForm.CHANGE_EVENT = 'change';
