import {FormField} from "./FormField";
import {formattedImplode} from "../../utils/formattedImplode";
import {escapeHTML} from "../../utils/escapeHTML";

/**
 * used for option-based selections, allowing multiple choices, with optional 'other' field that exposes a text field
 */
export class OptionsField extends FormField {

    /**
     * @type {string}
     */
    #containerId;

    /**
     * @type {string}
     */
    #otherTextId;

    /**
     *
     * @type {Object.<string, {label: string}>}
     */
    options = {};

    /**
     * if set then include a free-text input field alongside the 'other' option
     *
     * @type {boolean}
     */
    includeOtherFreeText = true;

    /**
     *
     * @type {({selection : Array.<string>, other : (string|null)}|null)}
     * @private
     */
    _value = {selection: [], other: null};

    static KEY_OTHER = 'other';

    static #TOP_LEVEL_ELEMENT = 'fieldset';

    /**
     *
     * @param {{[label] : string, [helpText]: string, [options]: {}, [includeOtherFreeText]: boolean}} [params]
     */
    constructor (params) {
        super(params);

        if (params) {
            if (params.options) {
                this.options = params.options;
            }

            if (params.hasOwnProperty('includeOtherFreeText')) {
                this.includeOtherFreeText = params.includeOtherFreeText;
            }
        }
    }

    /**
     *
     * @param {{selection : Array.<string>, other : (string|null)}} selection
     */
    set value(selection) {
        this._value = selection || {selection: [], other: null};
        this.updateView();
    }

    /**
     *
     * @returns {{selection: Array.<string>, other: (string|null)}}
     */
    get value() {
        return this._value;
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            for (let optionEl of document.querySelectorAll(`${OptionsField.#TOP_LEVEL_ELEMENT}#${this.#containerId} input[type="checkbox"]`)) {
               let selected =  optionEl.checked = this._value.selection.includes(optionEl.name);

               if (optionEl.name === OptionsField.KEY_OTHER && this.#otherTextId) {
                   let otherEl = document.getElementById(this.#otherTextId);
                   otherEl.style.display = selected ? 'block' : 'none';
                   otherEl.value = this._value.other === null ? '' : this._value.other.trim();
               }
            }
        }
    }

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
        if (!this.options) {
            throw new Error('Options have not been set before call to buildField()');
        }

        const container = document.createElement(OptionsField.#TOP_LEVEL_ELEMENT);
        container.className = 'form-group';
        this.#containerId = container.id = FormField.nextId;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.style.display = 'block';
        labelEl.textContent = this.label;

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        for (let key in this.options) {
            if (this.options.hasOwnProperty(key)) {
                this.#buildOption(container, key, this.options[key])
            }
        }

        if (this.validationMessage) {
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        container.addEventListener('change', this.inputChangeHandler.bind(this));

        this._fieldEl = container;
    }

    /**
     *
     * @param {HTMLElement} fieldSet
     * @param {string} key
     * @param {{label : string}} option
     */
    #buildOption(fieldSet, key, option) {
        // <div class="form-check">
        //     <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
        //     <label class="form-check-label" for="defaultCheck1">
        //         Default checkbox
        //     </label>
        // </div><

        const container = fieldSet.appendChild(document.createElement('div'));
        container.className = 'form-check';

        const optionField = container.appendChild(document.createElement('input'));
        optionField.type = 'checkbox';
        optionField.className = "form-check-input";
        optionField.id = FormField.nextId;
        optionField.name = key;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = optionField.id;
        labelEl.className = 'form-check-label';
        labelEl.textContent = option.label;

        if (OptionsField.KEY_OTHER === key && this.includeOtherFreeText) {
            const otherTextEl = container.appendChild(document.createElement('input'));
            otherTextEl.id = this.#otherTextId = FormField.nextId;
            otherTextEl.className = 'form-control';
            otherTextEl.style.display = 'none';
        }
    }

    /**
     *
     * @param {Event} event
     */
    inputChangeHandler (event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        let value = {
            selection : [],
            other : null
        };

        let otherSelected = false;
        let otherEl;

        if (this.#otherTextId) {
            otherEl = document.getElementById(this.#otherTextId);
        }

        const options = document.querySelectorAll(`${OptionsField.#TOP_LEVEL_ELEMENT}#${this.#containerId} input[type="checkbox"]:checked`);
        for (let option of options) {
            value.selection[value.selection.length] = option.name;

            if (option.name === OptionsField.KEY_OTHER && this.#otherTextId) {
                value.other = FormField.cleanRawInput(otherEl);
                otherSelected = true;
            }
        }

        this.value = value; // the setter will trigger a refresh of the view
        this.fireEvent(FormField.EVENT_CHANGE);
    }

    /**
     * by the time summariseImpl has been called have already checked that summary is wanted
     *
     * @param {string} key
     * @param {{field : typeof OptionsField, attributes : {options : Object.<string, {label : string}>}, summary : {summaryPrefix: string}}} property properties of the form descriptor
     * @param {Object.<string, {}>} attributes attributes of the model object
     * @return {string}
     */
    static summariseImpl(key, property, attributes) {
        const summaryDescriptor = property.summary;
        const methods = [];

        if (attributes[key].selection.length) {
            for (let attributeValue of attributes[key].selection) {
                if ('other' === attributeValue && attributes[key].other) {
                    methods[methods.length] = `${property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label} (${attributes[key].other})`;
                } else {
                    methods[methods.length] = property.attributes.options[attributeValue].summary || property.attributes.options[attributeValue].label;
                }
            }

            return escapeHTML(`${summaryDescriptor.summaryPrefix} ${formattedImplode(',', 'or', methods)}`);
        } else {
            return '';
        }
    }
}