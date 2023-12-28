import {Form, OccurrenceForm, FormField, SelectField} from 'bsbi-app-framework-view';
import {Taxon} from 'bsbi-app-framework';

/**
 * used for 'Stage' (phenology) field. Content adapts depending on taxon group (flowering plants, ferns, clubmosses)
 *
 */
export class PhenologySelectField extends SelectField {

    static MODE_FLOWERING_PLANT = 'floweringPlant';
    static MODE_CLUBMOSS = 'clubmoss';
    static MODE_FERN = 'fern';
    static MODE_ALL = 'all';

    /**
     * @type {OccurrenceForm}
     */
    parentForm;

    /**
     *
     * @param {{[label] : string, [helpText]: string, [options]: Object.<string, {label: string}>, [includeOtherFreeText]: boolean, [placeholder]: string}} [params]
     */
    constructor (params) {
        super(params);
    }

    _currentMode = PhenologySelectField.MODE_ALL;

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
        if (!this.options) {
            throw new Error('Options have not been set before call to buildField()');
        }

        this._currentMode = this._taxonGroup();

        this._menuId = FormField.nextId;
        const selectEl = document.createElement('select');
        selectEl.id = this._menuId;
        selectEl.className = 'form-select';

        let container;

        if (this.useInlineLabel) {
            const outerContainer = document.createElement('div');

            container = outerContainer.appendChild(document.createElement('div'));

            this._innerContainer = container;

            outerContainer.className = 'mb-3 bsbi-controls';
            container.className = `${this.containerClassName} input-group`;
            this._containerId = container.id = FormField.nextId;

            const labelEl = container.appendChild(document.createElement('label'));
            labelEl.htmlFor = this._menuId;
            labelEl.className = 'input-group-text';
            labelEl.style.display = 'block';
            labelEl.innerHTML = this.label;

            container.appendChild(selectEl);

            if (this.helpText) {
                const helpTextField = outerContainer.appendChild(document.createElement('small'));
                helpTextField.innerHTML = this.helpText;
                helpTextField.className = 'bsbi-form-help';
            }

            this._fieldEl = outerContainer;
        } else {
            container = document.createElement(SelectField._TOP_LEVEL_ELEMENT);
            container.className = 'mb-3 bsbi-controls phenology-field';
            this._containerId = container.id = FormField.nextId;

            const labelEl = container.appendChild(document.createElement('label'));
            labelEl.htmlFor = this._menuId;
            labelEl.style.display = 'block';
            labelEl.innerHTML = this.label;

            if (this.helpText) {
                const helpTextField = container.appendChild(document.createElement('small'));
                helpTextField.innerHTML = this.helpText;
            }

            container.appendChild(selectEl);
            this._fieldEl = container;
        }

        this._buildOptions(container, selectEl, this._currentMode);

        if (this.validationMessage) {
            // validation element must be adjacent to the select field
            // and so may not be compatible with floating labels
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        container.addEventListener('change', this.inputChangeHandler.bind(this));

        this.parentForm.addListener(Form.CHANGE_EVENT, () => {
            const newMode = this._taxonGroup();

            if (newMode !== this._currentMode) {
                this._currentMode = newMode;

                if (newMode !== PhenologySelectField.MODE_ALL) {
                    this.value = null; // reset to default
                }

                this._buildOptions(container, selectEl, this._currentMode);
                this.updateView();
            }
        });
    }

    /**
     * @return string
     * @private
     */
    _taxonGroup() {
        const taxonId = this.parentForm.model?.attributes?.taxon?.taxonId;

        if (!taxonId) {
            return PhenologySelectField.MODE_ALL;
        } else {
            if (Taxon.rawTaxa?.ferns && Taxon.rawTaxa.ferns.includes(taxonId)) {
                return PhenologySelectField.MODE_FERN;
            } if (Taxon.rawTaxa?.clubMosses && Taxon.rawTaxa.clubMosses.includes(taxonId)) {
                return PhenologySelectField.MODE_CLUBMOSS;
            } else {
                return PhenologySelectField.MODE_FLOWERING_PLANT;
            }
        }
    }

    _buildOptions(container, selectEl, mode) {
        container.dataset.mode = mode;

        selectEl.options.length = 0;

        if (this.placeholder) {
            this._buildOption(container, selectEl, '', {label : this.placeholder})
        }

        for (let key in this.options) {
            if (this.options.hasOwnProperty(key)) {

                if (this.options[key].mode.includes(mode)) {
                    this._buildOption(container, selectEl, key, this.options[key]);
                }
            }
        }
    }
}
