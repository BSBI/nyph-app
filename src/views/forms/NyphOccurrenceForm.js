import helpPanelText from "../../templates/formHelp/recordsHelp.html";
import {
    OccurrenceForm,
    FormField,
    ImageField,
    //OptionsField,
    //SelectField,
    TaxonPickerField,
    TextAreaField, TextGeorefField, MapGeorefField
} from "bsbi-app-framework-view";
import taxonDropdownHelp from "../../templates/nyphTaxonDropdownHelp.html";
import {PhenologySelectField} from "../formfields/PhenologySelectField";
//import {MapGeorefField} from "../formfields/MapGeorefField";

export class NyphOccurrenceForm extends OccurrenceForm {
    /**
     * @type {string}
     */
    static sectionTitle = 'Details of plant';

    /**
     * @type {string}
     */
    static help = helpPanelText;

    /**
     * sets this._formContentContainer to the container that should contain the form fields
     *
     * if no wrapper then can re-use the outer container id (this.#formEl
     */
    buildContentContainer(outerContainer) {
        console.log('Building OccurrenceForm content container');

        const cardEl = outerContainer.appendChild(document.createElement('div'));
        cardEl.className = 'card mt-3 ms-0 me-0 mb-3';

        const cardHeaderEl = cardEl.appendChild(document.createElement('div'));
        cardHeaderEl.className = 'card-header';

        cardHeaderEl.textContent = NyphOccurrenceForm.sectionTitle;

        this._formContentContainer = cardEl.appendChild(document.createElement('div'));
        this._formContentContainer.className = 'card-body';

        return this._formContentContainer;
    }

    /**
     *
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string, nyphRank: boolean}}>}
     */
    static properties = {
        taxon : {
            field: TaxonPickerField,
            attributes: {
                label: '', //'plant name',
                placeholder: 'plant name',
                validationMessage: 'Please specify a name or provide some photos if you cannot identify the plant.',
                helpText: 'Type the common or scientific name of the plant and, if possible, pick a suggestion from the list. If you do not know the name of the plant then please leave this blank and include some photos.',
                nyphRank: true,
                promotedGenera: [
                    '2cd4p9h.fsn', // Taraxacum
                    //'2cd4p9h.k1v', // Euphrasia
                    '2cd4p9h.mby', // Narcissus
                    '2cd4p9h.9h1', // Hieracium
                    //'2cd4p9h.mty', // Ulmus
                    //'2cd4p9h.5rs', // Callitriche
                    //'2cd4p9h.n1r', // Quercus
                    '2cd4p9h.vz0', // Rosa
                    '2cd4p9h.bxw', // Arctium
                    //'2cd4p9h.33x', // Cotoneaster
                ],
                taxonDropdownHelp: taxonDropdownHelp,
            },
            /**
             *
             * @param {string} key
             * @param {{}} property
             * @param {{}} modelAttributes
             * @return {boolean} true if valid
             */
            validator(key, property, modelAttributes) {
                if (!(modelAttributes.hasOwnProperty(key) &&
                    !property.field.isEmpty(modelAttributes[key])
                )) {
                    // taxon field is empty, check whether there is an image
                    return (modelAttributes.hasOwnProperty('images') &&
                        !ImageField.isEmpty(modelAttributes['images'])
                    )
                } else {
                    return true;
                }
            }
        },
        images : {
            field: ImageField,
            attributes: {
                label: "(optional) please provide a photo",
                placeholder: 'photos',
                helpText: `If you've not named your find then we'll need a photo. Otherwise, if the plant is unusual or if you are unsure of its identity then photos will help us to check your record.<!--<br><strong>Submitted images remain your property, but you agree to allow us to use the photos under the terms of a <a href="#" title="Creative Commons Attribution" data-bs-toggle="modal" data-bs-target="#${ImageField.LICENSE_MODAL}">CC BY</a> license.</strong>-->`
            }
        },
        georef : {
            field: MapGeorefField,
            attributes: {
                label: 'Grid-reference',
                helpText: '(optional) leave blank to use the overall survey grid-square, use gps, enter a grid-reference or click on the map',
                completion: FormField.COMPLETION_OPTIONAL, // not required as can fall back to the survey grid-ref
                includeSearchBox: true,
                baseSquareResolution: 1000,
                gpsInitialisationMode: MapGeorefField.GPS_INITIALISATION_MODE_MOBILE_PERMITTED,
                initialiseFromDefaultSurveyGeoref: true,
                gpsTextLabel: true,
            },
            summary : {
                summarise : true
            },
            summarise(key, property, modelAttributes) {
                if (modelAttributes.hasOwnProperty(key) &&
                    !property.field.isEmpty(modelAttributes[key])
                ) {
                    const precision = (modelAttributes[key].source === TextGeorefField.GEOREF_SOURCE_GPS && modelAttributes[key].precision) ?
                        ` &#177;${Math.round(modelAttributes[key].precision / 2)} m`
                        :
                        '';

                    return `<span class="gridref-summary">${modelAttributes[key].gridRef}</span>${modelAttributes[key].source === TextGeorefField.GEOREF_SOURCE_GPS ? `${precision} [GPS]` : ''}`;
                } else {
                    return '';
                }
            }
        },
        comments: {
            field: TextAreaField,
            attributes: {
                label: 'Any other comments about this plant?',
                helpText: '',
                autocomplete: 'off'
            },
            summary: {
                summarise: true,
            }
        },
        stage : {
            field: PhenologySelectField,

            attributes: {
                label: 'Stage',
                helpText: 'Please record only plants that are flowering.',
                placeholder: '',
                options: {
                    'flowering': {
                        label: "open flowers",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FLOWERING_PLANT],
                        isDefault: true
                    },
                    'flower buds': {
                        label: "flower buds",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FLOWERING_PLANT]
                    },
                    'fruiting': {
                        label: "fruit / seed",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FLOWERING_PLANT]
                    },
                    'immature': {
                        label: "immature / seedling",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FLOWERING_PLANT]
                    },
                    'mature (vegetative only)': {
                        label: "mature (vegetative only)",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FLOWERING_PLANT]
                    },
                    'sporophyte': {
                        label: "sporophyte",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FERN]
                    },
                    'gametophyte': {
                        label: "gametophyte",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FERN]
                    },
                    'dead': {
                        label: "dead",
                        mode: [PhenologySelectField.MODE_ALL, PhenologySelectField.MODE_FLOWERING_PLANT, PhenologySelectField.MODE_FERN]
                    },
                },
                includeOtherFreeText: false,
                completion: FormField.COMPLETION_OPTIONAL,
                useInlineLabel: true
            },
        }
    };

    getFormSectionProperties() {
        return NyphOccurrenceForm.properties;
    }
}

//NyphOccurrenceForm.CHANGE_EVENT = 'change';
