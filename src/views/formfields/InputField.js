import {FormField} from "./FormField";
import {uuid} from "../../models/Model";
import {escapeHTML} from "../../utils/escapeHTML";

export class InputField extends FormField {

    /**
     * @type {string}
     */
    #inputId;

    /**
     * @type {string}
     */
    #containerId;

    /**
     *
     * @type {string}
     * @private
     */
    _value = '';

    /**
     *
     * @type {string}
     * @private
     */
    _inputType = 'text';

    /**
     *
     * @type {string}
     * @private
     */
    _autocomplete = '';

    /**
     *
     * @param {{[label] : string, [helpText]: string, [options]: {}, [placeholder]: string, [type]: string, [autocomplete]: string}} [params]
     */
    constructor (params) {
        super(params);

        if (params) {
            if (params.type) {
                this._inputType = params.type;
            }

            if (params.placeholder) {
                this.placeholder = params.placeholder;
            }

            if (params.autocomplete) {
                this._autocomplete = params.autocomplete;
            }
        }
    }

    /**
     *
     * @param {(string|null|undefined)} textContent
     */
    set value(textContent) {
        this._value = (undefined === textContent || null == textContent) ? '' : textContent.trim();
        this.updateView();
    }

    /**
     *
     * @returns {string}
     */
    get value() {
        return this._value;
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            const inputEl = document.getElementById(this.#inputId);
            inputEl.value = FormField.cleanRawString(this._value);
        }
    }

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
        // <div class="form-group">
        //     <label for="{baseId}gridref">Postcode or grid-reference</label>
        //     <input type="text" class="form-control" id="{baseId}gridref" aria-describedby="grHelp" placeholder="Grid-reference or postcode">
        //     <small id="grHelp" class="form-text text-muted">We need to be able to put your survey on our map. Detailed locations won't be made public.</small>
        // </div>

        const container = document.createElement('div');
        container.className = 'form-group';
        this.#containerId = container.id = FormField.nextId;

        this.#inputId = FormField.nextId;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = this.#inputId;
        labelEl.textContent = this.label;

        const inputField = container.appendChild(document.createElement('input'));
        inputField.className = "form-control";
        inputField.id = this.#inputId;
        inputField.type = this._inputType;

        if (this.placeholder) {
            inputField.placeholder = this.placeholder;
        }

        if (this._autocomplete) {
            inputField.autocomplete = this._autocomplete;

            if ('off' === this._autocomplete) {
                // browsers tend to ignore autocomplete off, so also assign a random 'name' value
                inputField.name = uuid();
            }
        }

        if (this.completion === FormField.COMPLETION_COMPULSORY) {
            inputField.required = true;
        }

        if (this.validationMessage) {
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        inputField.addEventListener('change', this.inputChangeHandler.bind(this));

        this._fieldEl = container;
    }

    /**
     *
     * @param {(boolean|null)} isValid
     */
    markValidity(isValid) {
        const el = document.getElementById(this.#inputId);

        if (null === isValid) {
            el.classList.remove('is-invalid', 'is-valid');
        } else {
            el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
            el.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
    }

    inputChangeHandler (event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)
        
        console.log('got input field change event');
        
        this.value = FormField.cleanRawString(document.getElementById(this.#inputId).value);
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
        return (attributes[key] !== '' && attributes[key] !== null && attributes[key] !== undefined) ?
            escapeHTML(attributes[key].trim())
            : '';
    }
}