import {Form} from "./Form";

export class PlantAlertSurveyForm extends Form {

    /**
     * sections keyed by numerical order
     *
     * @type {Array.<typeof PlantAlertSurveyFormSection>}
     */
    static sections = [];

    /**
     *
     * @type {{string, typeof PlantAlertSurveyFormSection}}
     */
    static sectionsByKey = {};

    /**
     * @type {Survey}
     */
    #survey;

    _formFieldsBuilt = false;

    /**
     * @type {typeof PlantAlertSurveyFormSection}
     */
    section;

    /**
     *
     * @param {typeof PlantAlertSurveyFormSection} section
     */
    constructor(section) {
        super();
        this.section = section;
    }

    /**
     *
     * @returns {HTMLElement}
     */
    get formElement() {
        let el = super.formElement;

        if (!this._formFieldsBuilt) {
            this.buildFormFields();
        }

        return el;
    }

    updateModelFromContent() {
        console.log('updating survey from PlantAlertSurveyForm content');

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key];

                this.#survey.attributes[key] = field.value;
            }
        }

        console.log({survey: this.#survey});
    }

    /**
     *
     * @param {Survey} model
     */
    set model (model) {
        this.#survey = model;
        this.populateFormContent();
    }

    get model() {
        return this.#survey;
    }

    /**
     * the change event triggers after a field has changed, before the value has been read back into the model
     *
     * @param event
     */
    changeHandler(event) {
        console.log('survey form change event');
        console.log({event});

        this.fireEvent(PlantAlertSurveyForm.CHANGE_EVENT, {form: this});
    }

    destructor() {
        super.destructor();
        this.#survey = null;
    }

    /**
     *
     * @param {typeof PlantAlertSurveyFormSection} formClass
     */
    static registerSection(formClass) {
        PlantAlertSurveyForm.sections[formClass.sectionSortOrder] = formClass;
        PlantAlertSurveyForm.sectionsByKey[formClass.sectionNavigationKey] = formClass;
    }

    /**
     *
     */
    initialiseFormFields() {
        const properties = this.section.properties;

        this.fields = {};

        for (let key in properties) {
            if (properties.hasOwnProperty(key)) {
                // noinspection JSPotentiallyInvalidConstructorUsage
                this.fields[key] = new properties[key].field(properties[key].attributes);
            }
        }
    }

    getFormSectionProperties() {
        return this.section.properties;
    }
}

PlantAlertSurveyForm.CHANGE_EVENT = 'change';
