import {FormField} from "./FormField";
import {uuid} from "../../models/Model";
import {escapeHTML} from "../../utils/escapeHTML";

export class TextAreaField extends FormField {

    /**
     * @type {string}
     */
    #textAreaId;

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
    _autocomplete = '';

    /**
     *
     * @param {{[label] : string, [helpText]: string, [options]: {}, [placeholder]: string, [type]: string, [autocomplete]: string}} [params]
     */
    constructor (params) {
        super(params);

        if (params) {
            if (params.options) {
                this.options = params.options;
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

    get value() {
        return this._value;
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            const textAreaEl = document.getElementById(this.#textAreaId);
            textAreaEl.value = FormField.cleanRawString(this._value);
        }
    }

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
    // <div class="form-group">
    //     <label for="exampleFormControlTextarea1">Example textarea</label>
    //     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    // </div>

        const container = document.createElement('div');
        container.className = 'form-group';
        this.#containerId = container.id = FormField.nextId;

        this.#textAreaId = FormField.nextId;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = this.#textAreaId;
        labelEl.textContent = this.label;

        const textareaField = container.appendChild(document.createElement('textarea'));
        textareaField.className = "form-control";
        textareaField.id = this.#textAreaId;

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        if (this._autocomplete) {
            textareaField.autocomplete = this._autocomplete;

            if ('off' === this._autocomplete) {
                textareaField.name = uuid();
            }
        }

        if (this.validationMessage) {
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        textareaField.addEventListener('change', this.inputChangeHandler.bind(this));

        this._fieldEl = container;
    }

    inputChangeHandler (event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)
        
        console.log('got text area field input change event');
        
        this.value = FormField.cleanRawString(document.getElementById(this.#textAreaId).value);
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