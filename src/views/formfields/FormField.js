import {EventHarness} from "../../framework/EventHarness";

export class FormField extends EventHarness {

    _value;

    /**
     * overall wrapped field element (not necessarily the form element itself)
     *
     * @type {HTMLElement}
     */
    _fieldEl;

    /**
     *
     * @type {string}
     */
    label = 'field label';

    /**
     *
     * @type {string}
     */
    helpText = '';

    /**
     * validation message - displayed if field is not valid
     * HTML string
     *
     * @type {string}
     */
    validationMessage = '';

    /**
     *
     * @type {string}
     */
    static COMPLETION_COMPULSORY = 'compulsory';
    static COMPLETION_DESIRED = 'desired';
    static COMPLETION_OPTIONAL = 'optional';

    /**
     *
     * @type {string}
     */
    completion = FormField.COMPLETION_OPTIONAL;

    static #fieldIdIndex = 1;

    static EVENT_CHANGE = 'fieldChange';

    /**
     *
     * @param {{[label] : string, [helpText]: string, [validationMessage]: string, [completion]: string}} [params]
     */
    constructor (params) {
        super();

        if (params) {
            if (params.label) {
                this.label = params.label;
            }

            if (params.helpText) {
                this.helpText = params.helpText;
            }

            if (params.validationMessage) {
                this.validationMessage = params.validationMessage;
            }

            if (params.completion) {
                // @see COMPLETION_COMPULSORY, COMPLETION_DESIRED, COMPLETION_OPTIONAL
                this.completion = params.completion;
            }
        }
    }

    static get nextId() {
        return `field${FormField.#fieldIdIndex++}`;
    }

    get value() {
        return this._value;
    }

    set value(value) {

    }

    get fieldElement() {
        if (!this._fieldEl) {
            this.buildField();
        }

        return this._fieldEl;
    }

    /**
     * @type {Form}
     */
    parentForm;

    /**
     * @type {string}
     */
    attributeName;

    addField () {
        const formEl = this.parentForm.formElement;

        formEl.appendChild(this.fieldElement);
    }

    /**
     *
     * @param {boolean} isValid
     */
    markValidity(isValid) {

    }

    /**
     *
     * @param {HTMLInputElement} inputElement
     * @returns {string}
     */
    static cleanRawInput(inputElement) {
        return inputElement.value.trim().replace(/\s\s+/g, ' ');
    }

    /**
     *
     * @param {string} text
     * @returns {string}
     */
    static cleanRawString(text) {
        return text.trim().replace(/\s\s+/g, ' ');
    }

    /**
     *
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {
        return value === '';
    }

    /**
     *
     * @param {string} key
     * @param property properties of the form descriptor
     * @param attributes attributes of the model object
     * @return {(boolean|null)} returns null if validity was not assessed
     */
    static isValid(key, property, attributes) {
        if (property.attributes.completion &&
            (property.attributes.completion === FormField.COMPLETION_COMPULSORY || property.attributes.completion === FormField.COMPLETION_DESIRED)
        ) {
            // test whether required field is missing
            return !(!attributes.hasOwnProperty(key) ||
                property.field.isEmpty(attributes[key])
            );
        }
        // field is present or optional
        // report as valid unless content is corrupt

        return null; // field not assessed
    }

    /**
     *
     * @param {string} key
     * @param {{field : typeof FormField, [summary] : {}}} property properties of the form descriptor
     * @param attributes attributes of the model object
     * @return {string}
     */
    static summarise(key, property, attributes) {
        if (property.summary && (!property.summary.hasOwnProperty('summarise') || true === property.summary.summarise)) {
            // test is that summary spec object exists and doesn't have the summarise flag set to false
            return property.field.summariseImpl(key, property, attributes);
        } else {
            return '';
        }
    }

    /**
     * by the time summariseImpl has been called have already checked that summary is wanted
     *
     * @param {string} key
     * @param {{field : typeof FormField, summary : {}}} property properties of the form descriptor
     * @param {{}} attributes attributes of the model object
     * @returns {string}
     */
    static summariseImpl(key, property, attributes) {
        return '';
    }
}