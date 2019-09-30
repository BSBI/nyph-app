import {FormField} from "./FormField";
import {TaxonSearch} from "../../utils/taxonpicker/TaxonSearch";
import {Taxon} from "../../models/Taxon";

export class TaxonPickerField extends FormField {
    /**
     * @type {TaxonSearch}
     */
    taxonSearch;

    /**
     * @type {string}
     */
    #inputFieldId;

    /**
     * @type {string}
     */
    #dropDownListDivId;

    /**
     * @type {string}
     */
    #dropDownListUlId;

    #containerId;

    #taxonLookupTimeoutHandle = null;

    #changeEventTimeout = null;

    /**
     *
     * @type {null|number}
     */
    #selectedIndex = null;

    /**
     *
     * @type {string}
     * @private
     */
    _lastInputValue = '';

    /**
     * @type {Array.<{entityId: string,
                        vernacular: string,
                        qname: string,
                        name: string,
                        qualifier: string,
                        authority: string,
                        uname: string,
                        vernacularMatched: boolean,
                        exact: boolean,
                        near: boolean,
                        formatted: string,
                        acceptedEntityId: string,
                        acceptedNameString: string,
                        acceptedQualifier: string,
                        acceptedAuthority: string
                        }>}
     */
    #searchResults = [];

    /**
     *
     * @type {{taxonName: string, taxonId: string, vernacularMatch: boolean}}
     * @private
     */
    _value = {
        taxonId: '',
        taxonName: '',
        vernacularMatch: false
    };

    static timeoutDelay = 50;

    /**
     *
     * @param {{label : string, [helpText]: string}} [params]
     */
    constructor (params) {
        super(params);

        this.taxonSearch = new TaxonSearch();
    }

    /**
     *
     * @param {({taxonName: string, taxonId: string, vernacularMatch: boolean}|null)} taxonSpec
     */
    set value(taxonSpec) {
        let taxon;

        if (taxonSpec && taxonSpec.taxonId) {
            // this will trigger an error if somehow an invalid id was supplied
            taxon = Taxon.fromId(taxonSpec.taxonId);

            // build the saved values from the dictionary rather than from the literal user entry (which may use different formatting)
            this._value = {
                taxonId: taxon.id,
                taxonName: taxonSpec.vernacularMatch ? taxon.vernacular : taxon.nameString,
                vernacularMatch: taxonSpec.vernacularMatch
            };
        } else {
            this._value = {
                taxonId: '',
                taxonName: taxonSpec && taxonSpec.taxonName ? taxonSpec.taxonName : '',
                vernacularMatch: null
            };
        }

        this.updateView();
    }

    /**
     *
     * @returns {{taxonName: string, taxonId: string, vernacularMatch: boolean}}
     */
    get value() {
        return this._value;
    }

    /**
     *
     * @param {({taxonName: string, taxonId: string, vernacularMatch: boolean}|null)} value
     * @returns {boolean}
     */
    static isEmpty(value) {
        return !value || (value && !value.taxonName);
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            const inputEl = document.getElementById(this.#inputFieldId);
            inputEl.value = this._value.taxonName;

            this._lastInputValue = this._value.taxonName; // probably not necessary
        }
    }

    /**
     *
     * @param {(boolean|null)} isValid
     */
    markValidity(isValid) {
        const el = document.getElementById(this.#inputFieldId);

        if (null === isValid) {
            el.classList.remove('is-invalid', 'is-valid');
        } else {
            el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
            el.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
    }

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
    //    <div class="form-group">
    //     <label for="exampleFormControlInput1">Email address</label>
    //     <div class="dropbox-wrapper">
    //     <input type="text" class="form-control dropbox-input" id="exampleFormControlInput1" placeholder="name@example.com">
    //     <div class="dropdown-list">
    //     </div>
    //   </div>

        const container = document.createElement('div');
        container.className = 'form-group';
        this.#containerId = container.id = FormField.nextId;

        this.#inputFieldId = FormField.nextId;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = this.#inputFieldId;
        labelEl.textContent = this.label;

        const wrapperEl = container.appendChild(document.createElement('div'));
        wrapperEl.className = 'dropdown-wrapper';

        const inputField = wrapperEl.appendChild(document.createElement('input'));
        inputField.className = "form-control dropdown-input";
        inputField.id = this.#inputFieldId;
        inputField.autocomplete = 'off';
        inputField.spellcheck = false;

        if (this.validationMessage) {
            // unfortunately the validation message has to be placed immediately after the input field
            const validationMessageElement = wrapperEl.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        const dropDownList = wrapperEl.appendChild(document.createElement('div'));
        dropDownList.className = 'dropdown-list';
        this.#dropDownListDivId = dropDownList.id = FormField.nextId;

        this.#dropDownListUlId = FormField.nextId;

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        inputField.addEventListener('keydown', this.keydownHandler.bind(this));
        //inputField.addEventListener('keyup', this.keyupHandler.bind(this)); // unfortunately keyup doesn't fire for touch keyboards
        inputField.addEventListener('input', this.inputHandler.bind(this));
        inputField.addEventListener('change', this.inputChangeHandler.bind(this));

        container.addEventListener('focusin', this.focusHandler.bind(this));
        container.addEventListener('focusout', this.blurHandler.bind(this));
        dropDownList.addEventListener('click', this.dropboxClickHandler.bind(this));


        this._fieldEl = container;
    }

    /**
     *
     * @param {KeyboardEvent} event
     * @param {HTMLInputElement} event.target
     * @return {boolean}
     */
    keydownHandler(event) {
        this._lastInputValue = event.target.value.trimLeft(); // save value for testing in InputEvent handler

        switch (event.key) {
            case 'Enter':
                event.preventDefault();

                // exit if no suggestions
                // if (this.selectedIndex < 0 || !this.suggestionsCol) {
                //     return;
                // }

                // // find which one is currently selected
                // const selectedModel = this.suggestionsCol.at(this.selectedIndex);
                //
                // const species = selectedModel.toJSON();
                // delete species.selected;
                // this.trigger('taxon:selected', species, false);

                break;

            case 'ArrowUp':
                event.preventDefault();

                // if (this.selectedIndex > 0) {
                //     this.suggestionsCol.at(this.selectedIndex).set('selected', false);
                //     this.selectedIndex--;
                //     this.suggestionsCol.at(this.selectedIndex).set('selected', true);
                // }
                break;

            case 'ArrowDown': // Down
                event.preventDefault();

                // if ((this.suggestionsCol && this.suggestionsCol.length) && // initialized
                //     this.selectedIndex < this.suggestionsCol.length - 1) { // not out of boundaries
                //     this.suggestionsCol.at(this.selectedIndex).set('selected', false);
                //     this.selectedIndex++;
                //     this.suggestionsCol.at(this.selectedIndex).set('selected', true);
                // }
                break;

            // default:
            //     // Other
            //     let text = input;
            //
            //     // on keyDOWN need to add the pressed char
            //     let pressedChar = String.fromCharCode(event.key);
            //     if (event.keyCode != 8) {
            //         // http://stackoverflow.com/questions/19278037/javascript-non-unicode-char-code-to-unicode-character
            //         if (e.keyCode === 189 || e.keyCode === 109) {
            //             pressedChar = '-';
            //         }
            //         if (e.keyCode === 190) {
            //             pressedChar = '.';
            //         }
            //
            //         text += pressedChar;
            //     } else {
            //         // Backspace - remove a char
            //         text = text.slice(0, text.length - 1);
            //     }
            //
            //     // proceed if minimum length phrase was provided
            //     if ((text.replace(/\.|\s/g, '').length) >= TaxonSearch.MIN_SEARCH_LENGTH) {
            //         text = text.trim();
            //
            //         // Clear previous timeout
            //         if (this.#taxonLookupTimeoutHandle !== -1) {
            //             clearTimeout(this.#taxonLookupTimeoutHandle);
            //         }
            //
            //         // Set new timeout - don't run if user is typing
            //         this.#taxonLookupTimeoutHandle = setTimeout(function () {
            //             // let controller know
            //             that.trigger('taxon:searched', text.toLowerCase());
            //         }, 100);
            //     } else if (text.replace(/\.|\s/g, '').length === 0) {
            //         // no search text, but pass through search, so that 'Unknown sp' can be shown
            //
            //         // Clear previous timeout
            //         if (this.#taxonLookupTimeoutHandle !== -1) {
            //             clearTimeout(this.#taxonLookupTimeoutHandle);
            //         }
            //
            //         // Set new timeout - don't run if user is typing
            //         this.#taxonLookupTimeoutHandle = setTimeout(function () {
            //             // let controller know
            //             that.trigger('taxon:searched', '');
            //         }, 100);
            //     }
        }

    }

    /**
     *
     * @param {InputEvent} event
     */
    inputHandler(event) {
        const currentValue = event.target.value.trimLeft(); // save value for testing in InputEvent handler

        if (currentValue !== this._lastInputValue) {
            this.#triggerQuery(event.target);
        }
    }

    /**
     *
     * @param {KeyboardEvent} event
     * @return {boolean}
     */
    keyupHandler(event) {
        //console.log({'key' : event.key});

        if (event.key && (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete')) {
            //keypress was a printable character

            this.#triggerQuery(event.target);

            // let text = TaxonPickerField.cleanRawInput(event.target);
            //
            // // proceed if minimum length phrase was provided
            // if ((text.length) >= TaxonSearch.MIN_SEARCH_LENGTH) {
            //
            //     // Clear previous timeout
            //     if (this.#taxonLookupTimeoutHandle) {
            //         clearTimeout(this.#taxonLookupTimeoutHandle);
            //     }
            //
            //     // Set new timeout - don't run if user is typing
            //     this.#taxonLookupTimeoutHandle = setTimeout(() => {
            //         this.#searchResults = this.taxonSearch.lookup(
            //             TaxonPickerField.cleanRawInput(document.getElementById(this.#inputFieldId))
            //         );
            //
            //         console.log(this.#searchResults);
            //
            //         this.refreshSearchResultsList();
            //
            //         this.#taxonLookupTimeoutHandle = null;
            //     }, TaxonPickerField.timeoutDelay);
            // }
        }
    }

    /**
     *
     * @param {HTMLInputElement} inputEl
     */
    #triggerQuery(inputEl) {
        let text = FormField.cleanRawInput(inputEl);

        // Clear previous timeout
        if (this.#taxonLookupTimeoutHandle) {
            clearTimeout(this.#taxonLookupTimeoutHandle);
        }

        // proceed if minimum length phrase was provided
        if ((text.length) >= TaxonSearch.MIN_SEARCH_LENGTH) {

            // Set new timeout - don't run if user is typing
            this.#taxonLookupTimeoutHandle = setTimeout(() => {
                this.#searchResults = this.taxonSearch.lookup(
                    FormField.cleanRawInput(document.getElementById(this.#inputFieldId))
                );

                console.log(this.#searchResults);

                this.refreshSearchResultsList();

                this.#taxonLookupTimeoutHandle = null;
            }, TaxonPickerField.timeoutDelay);
        } else {
            // clear the results list
            this.#searchResults = [];
            this.refreshSearchResultsList();
        }
    }

    /**
     *
     * @param {Event} event
     */
    focusHandler(event) {
        console.log('focused');

        const dropDownEl = document.getElementById(this.#dropDownListDivId);

        //const container = document.getElementById(this.#containerId);

        if (!dropDownEl.classList.contains('dropdown-focused')) {
            // refresh dropdown list when first focused
            // focus event will re-fire after click on link in dropdown potentially disrupting subsequent click
            // it is important that the query is not re-run if already focused.
            const inputEl = document.getElementById(this.#inputFieldId);
            this.#triggerQuery(inputEl);

            dropDownEl.classList.add('dropdown-focused');
        }
    }

    /**
     *
     * @param {Event} event
     */
    blurHandler(event) {
        // clear taxon result lookup timeout
        if (this.#taxonLookupTimeoutHandle) {
            clearTimeout(this.#taxonLookupTimeoutHandle);
            this.#taxonLookupTimeoutHandle = null;
        }

        // to avoid blurring before a link click has been processed, introduce a delay
        setTimeout(() => {
            const dropDownEl = document.getElementById(this.#dropDownListDivId);
            dropDownEl.classList.remove('dropdown-focused');
            // console.log('applied blur');

        }, 500);
    }

    refreshSearchResultsList() {
        const dropdownListEl = document.getElementById(this.#dropDownListDivId);

        if (this.#searchResults.length) {
            const htmlResults = [];

            let n = 0;
            for (let result of this.#searchResults) {
                htmlResults[htmlResults.length] = `<a class="list-group-item list-group-item-action" href="#" data-occurrenceId="${result.entityId}" data-resultnumber="${n}">${TaxonSearch.formatter(result)}</a>`;
                ++n;
            }

            dropdownListEl.innerHTML = `<div class="list-group" id="${this.#dropDownListUlId}">${htmlResults.join('')}</div>`;



            // const htmlResults = [];
            //
            // let n = 0;
            // for (let result of this.#searchResults) {
            //     htmlResults[htmlResults.length] = `<li><a href="#" data-occurrenceId="${result.entityId}" data-resultnumber="${n}">${TaxonSearch.formatter(result)}</a></li>`;
            //     ++n;
            // }
            //
            // dropdownListEl.innerHTML = `<ul id="${this.#dropDownListUlId}">${htmlResults.join('')}</ul>`;
        } else {
            dropdownListEl.innerHTML = '';
        }

        this.#selectedIndex = null;
    }

    static cleanRawInput(inputElement) {
        return inputElement.value.trim().replace(/\s\s+/g, ' ');
    }

    /**
     *
     * @param {MouseEvent} event
     */
    dropboxClickHandler(event) {
        console.log('click handler');
        console.log(event);

        const targetEl = event.target.closest('a');
        console.log(targetEl);

        if (this.#changeEventTimeout) {
            clearTimeout(this.#changeEventTimeout);
            this.#changeEventTimeout = null;
            console.log('cleared a pending change event');
        }

        if (targetEl && targetEl.dataset.occurrenceid) {
            event.preventDefault();

            console.log(`got target ${targetEl.dataset.occurrenceid}`);

            const result = this.#searchResults[targetEl.dataset.resultnumber];

            //document.getElementById(this.#inputFieldId).blur();

            this.value = {
                taxonId: result.entityId,
                taxonName: result.vernacularMatched ? result.vernacular : result.qname,
                vernacularMatch: result.vernacularMatched
            }; // setter will refresh the field but not fire a change event

            this.fireEvent(FormField.EVENT_CHANGE);
        }
    }

    inputChangeHandler (event) {
        // need to prevent race-conditions between clicks and change events
        // i.e. a click event on the dropdown list might come after a change event on the input field

        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        console.log('got taxon field input change event');

        if (this.#changeEventTimeout) {
            clearTimeout(this.#changeEventTimeout);
        }

        // avoid acting on a change immediately, in case there is a click event following
        this.#changeEventTimeout = setTimeout(() => {
            console.log('processing taxon field input change event');

            // check if the dropdown list has an exact match, if so then use it
            const exactMatch = this.#searchResults.find((result) => {
                return result.exact;
            });

            if (exactMatch) {
                console.log('exact match');
                this.value = {
                    taxonId: exactMatch.entityId,
                    taxonName: exactMatch.vernacularMatched ? exactMatch.vernacular : exactMatch.qname,
                    vernacularMatch: exactMatch.vernacularMatched
                }; // setter will refresh the field but not fire a change event
            } else {
                console.log('no match');
                this.value = {
                    taxonId: '',
                    taxonName: document.getElementById(this.#inputFieldId).value.trim(),
                    vernacularMatch: null
                };
            }

            console.log(this._value);
            this.fireEvent(FormField.EVENT_CHANGE);
        }, 500);
    }
}
