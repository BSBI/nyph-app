import {EventHarness} from "../../framework/EventHarness";
import {FormField} from "../formfields/FormField";

export class Form extends EventHarness {

    /**
     * @type {HTMLElement}
     */
    #formEl;

    /**
     *
     * @type {number}
     */
    static #formSerial = 0;

    _formId;

    /**
     * container into which field contents should be inserted
     *
     * @type {HTMLElement}
     */
    _formContentContainer;

    /**
     * @type {Object.<string, FormField>}
     */
    fields;

    /**
     * if set then form should be validated whenever it changes
     *
     * @type {boolean}
     */
    liveValidation = false;

    /**
     * set if checked form fields are complete and valid
     * (starting point is null while form is empty - so that the first validation check results in a validation change event firing)
     *
     * @type {(boolean|null)}
     */
    isValid = null;

    static EVENT_VALIDATION_STATE_CHANGE = 'validationstatechange';

    /**
     *
     * @returns {HTMLElement}
     */
    get formElement() {
        if (!this.#formEl) {
            this.#formEl = document.createElement('form');
            this.#formEl.id = this._formId = `form${Form.#formSerial++}`;
            this.#formEl.noValidate = true; // bootstrap overrides browser-based validation

            if (this.liveValidation) {
                this.#formEl.className = 'needs-validation';
            }

            this.buildContentContainer(this.#formEl);
            //this._formContentContainer = this.#formEl; // currently the form doesn't have any inner liner elements

            this.#formEl.addEventListener('change', (event) => {
                this.changeHandler(event);
            }, {capture: false});
        }

        return this.#formEl;
    }

    /**
     * sets this._formContentContainer to the container that should contain the form fields
     *
     * if no wrapper then can re-use the outer container id (this.#formEl
     */
    buildContentContainer(outerContainer) {
        this._formContentContainer = outerContainer; // default form doesn't have any inner liner elements

        return this._formContentContainer
    }

    changeHandler(event) {
        console.log('form change event');
        console.log(arguments);
    }

    destructor() {
        super.destructor();
        this.#formEl = null;
    }

    static #idIndex = 0;

    static get nextId() {
        return `id${Form.#idIndex++}`;
    }

    static COMPLETION_STATUS_UNSTARTED = 'unstarted';
    static COMPLETION_STATUS_COMPLETE = 'complete';
    static COMPLETION_STATUS_IN_PROGRESS = 'inProgress';

    /**
     *
     */
    buildFormFields() {
        this.initialiseFormFields();

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key];

                field.parentForm = this;
                field.attributeName = key;
                this._formContentContainer.appendChild(field.fieldElement);

                field.addListener(FormField.EVENT_CHANGE, this, this.changeHandler);
            }
        }

        this._formFieldsBuilt = true;
    }

    /**
     * called after a form change once the model has been updated
     * validation is only applied if the form is subject to live validation
     */
    conditionallyValidateForm() {
        if (this.liveValidation) {
            this.validateForm();
        }
    }

    /**
     *
     * @returns {boolean}
     */
    validateForm() {
        this.liveValidation = true;
        this.formElement.classList.add('needs-validation'); // add a bootstrap class marking that the form should be subject to validation
        const validationResult = this.model.evaluateCompletionStatus(this.getFormSectionProperties());

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key];

                field.markValidity(validationResult.validity[key]);
            }
        }

        if (this.isValid !== validationResult.requiredFieldsPresent) {
            this.isValid = validationResult.requiredFieldsPresent;

            this.fireEvent(Form.EVENT_VALIDATION_STATE_CHANGE, this.isValid);
        }
        return validationResult.requiredFieldsPresent;
    }

    /**
     * fills in the form fields based on the model
     */
    populateFormContent() {
        if (this._formFieldsBuilt) {
            // throw new Error("populateFormContent shouldn't be called until fields have been initialised");

            const model = this.model;
            for (let key in this.fields) {
                if (this.fields.hasOwnProperty(key)) {
                    let field = this.fields[key];
                    field.value = model.attributes[key]; // value setter will update the field
                }
            }
            this.conditionallyValidateForm();
        }
    }
}