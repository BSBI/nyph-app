import {FormField} from "./FormField";
import {OptionsField} from "./OptionsField";
import {escapeHTML} from "../../utils/escapeHTML";
import {formattedImplode} from "../../utils/formattedImplode";

/**
 * used for select based menus, allowing multiple choices, with optional 'other' field that exposes a text field
 */
export class SelectField extends FormField {

    /**
     * @type {string}
     */
    #containerId;

    /**
     * @type {string}
     */
    #menuId;

    /**
     * @type {string}
     */
    #otherTextId;

    /**
     *
     * @type {Object.<string, {label: string}>}
     */
    options = {};

    placeholder = '';

    /**
     * if set then include a free-text input field alongside the 'other' option
     *
     * @type {boolean}
     */
    includeOtherFreeText = true;

    /**
     *
     * @type {{selection : Array.<string>, other : (string|null)}}
     * @private
     */
    _value = {selection: [], other: null};

    // static timeoutDelay = 50;

    //static KEY_OTHER = 'other';

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

            if (params.placeholder) {
                this.placeholder = params.placeholder;
            }
        }
    }

    /**
     *
     * @param {({selection : Array.<string>, other : (string|null)}|null)} selection
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

    /**
     *
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {
        return value.selection.length === 0 || value.selection[0] === '';
    }

    /**
     *
     * @param {(boolean|null)} isValid
     */
    markValidity(isValid) {
        const el = document.getElementById(this.#menuId);

        if (null === isValid) {
            el.classList.remove('is-invalid', 'is-valid');
        } else {
            el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
            el.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            for (let optionEl of document.querySelectorAll(`select#${this.#menuId} option`)) {
                if (optionEl.value !== '') {
                    let selected = optionEl.selected = this._value.selection.includes(optionEl.value);

                    if (optionEl.value === OptionsField.KEY_OTHER && this.#otherTextId) {
                        let otherEl = document.getElementById(this.#otherTextId);
                        otherEl.style.display = selected ? 'block' : 'none';
                        otherEl.value = this._value.other === null ? '' : this._value.other.trim();
                    }
                } else {
                    // default placeholder choice
                    optionEl.selected = (this._value.selection.length === 0);
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

        const container = document.createElement(SelectField.#TOP_LEVEL_ELEMENT);
        container.className = 'form-group';
        this.#containerId = container.id = FormField.nextId;

        this.#menuId = FormField.nextId;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = this.#menuId;
        //labelEl.className = 'form-check-label';
        labelEl.style.display = 'block';
        labelEl.innerHTML = this.label;

        const selectEl = document.createElement('select');
        selectEl.id = this.#menuId;
        selectEl.className = 'custom-select';

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        if (this.placeholder) {
            this.#buildOption(container, selectEl, '', {label : this.placeholder})
        }

        for (let key in this.options) {
            if (this.options.hasOwnProperty(key)) {
                this.#buildOption(container, selectEl, key, this.options[key])
            }
        }

        container.appendChild(selectEl);

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
     * @param {HTMLElement} containerEl
     * @param {HTMLSelectElement} selectEl
     * @param {string} key
     * @param {{label : string}} option
     */
    #buildOption(containerEl, selectEl, key, option) {

        const optionEl = selectEl.appendChild(document.createElement('option'));
        //optionEl.className = ;
        optionEl.value = key;
        optionEl.innerText = option.label;

        if (OptionsField.KEY_OTHER === key && this.includeOtherFreeText) {
            const otherTextEl = containerEl.appendChild(document.createElement('input'));
            otherTextEl.id = this.#otherTextId = FormField.nextId;
            otherTextEl.className = 'form-control';
        }
    }

    /**
     *
     * @param {Event} event
     */
    inputChangeHandler (event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)
        
        // console.log('got options change event');
        // console.log(event);

        let value = {
            selection : [],
            other : null
        };

        let otherSelected = false;
        let otherEl;

        if (this.#otherTextId) {
            otherEl = document.getElementById(this.#otherTextId);
        }

        const options = document.querySelectorAll(`select#${this.#menuId} option:checked`);
        for (let option of options) {
            if (option.value !== '') {
                value.selection[value.selection.length] = option.value;

                if (option.name === OptionsField.KEY_OTHER && this.#otherTextId) {
                    value.other = FormField.cleanRawInput(otherEl);
                    otherSelected = true;
                }
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