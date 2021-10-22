import helpPanelText from "../../templates/formHelp/recordsHelp.html";
import {
    Form,
    FormField,
    ImageField,
    OptionsField,
    SelectField,
    TaxonPickerField,
    TextAreaField, TextGeorefField
} from "bsbi-app-framework";

export class NyphOccurrenceForm extends Form {
    /**
     * @type {Occurrence}
     */
    #occurrence;

    _formFieldsBuilt = false;

    /**
     * nasty tight coupling, but is needed for saving of images
     * set by MainView immediately after the form is constructed
     *
     * @type {string}
     */
    surveyId = '';

    /**
     * @type {string}
     */
    static sectionTitle = 'Details of invasive garden plant';

    /**
     * @type {string}
     */
    static help = helpPanelText;

    constructor(occurrence) {
        super();

        if (occurrence) {
            this.model = occurrence;
        }
    }

    /**
     *
     * @returns {HTMLElement}
     */
    get formElement() {
        let el = super.formElement;

        if (!this._formFieldsBuilt) {
            this.buildFormFields();

            el.addEventListener('change', () => {
                console.log('occurrence form change event');
                console.log(arguments);
            }, {capture: false});
        }

        return el;
    }

    /**
     * sets this._formContentContainer to the container that should contain the form fields
     *
     * if no wrapper then can re-use the outer container id (this.#formEl
     */
    buildContentContainer(outerContainer) {
        const cardEl = outerContainer.appendChild(document.createElement('div'));
        cardEl.className = 'card mt-3 ml-0 mr-0 mb-3';

        const cardHeaderEl = cardEl.appendChild(document.createElement('div'));
        cardHeaderEl.className = 'card-header';

        cardHeaderEl.textContent = NyphOccurrenceForm.sectionTitle;

        this._formContentContainer = cardEl.appendChild(document.createElement('div'));
        this._formContentContainer.className = 'card-body';

        return this._formContentContainer;
    }

    /**
     *
     * @returns {(string|null)}
     */
    get occurrenceId() {
        return this.#occurrence ? this.#occurrence.id : null;
    }

    /**
     *
     * @returns {(number|null)}
     */
    get projectId() {
        return this.#occurrence ? this.#occurrence.projectId : null;
    }

    /**
     *
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
     */
    static properties = {
        taxon : {
            field: TaxonPickerField,
            attributes: {
                label: 'plant name',
                validationMessage: 'Please specify a taxon name or provide some photos if you cannot identify the plant.',
                helpText: 'Type the common or scientific name of the invasive plant and, if possible, pick a suggestion from the list. If you do not know the name of the plant then please leave this blank and include some photos.'
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
                    // taxon field is empty, check if have an image
                    return (modelAttributes.hasOwnProperty('images') &&
                        !ImageField.isEmpty(modelAttributes['images'])
                    )
                } else {
                    return true;
                }
            }
        },
        geoRef : {
            field: TextGeorefField,
            attributes: {
                label: 'Grid-reference',
                helpText: '',
                completion: FormField.COMPLETION_COMPULSORY,
            }
        },
        idConfidence : {
            field: SelectField,
            attributes: {
                label: 'How confident are you about your identification of this plant?',
                helpText: '',
                placeholder : 'please choose an option',
                options: {
                    "1" : {label: "very sure"},
                    "2" : {label: "not really sure"},
                    "3" : {label: "could be wrong"}
                },
                includeOtherFreeText : false,
                completion: FormField.COMPLETION_DESIRED,
            }},
        images : {
            field: ImageField,
            attributes: {
                label: 'Please provide some photos of the plant',
                placeholder: 'photos',
                helpText: `If the plant is unusual or if you are unsure of its identity then photos will help us check your record.<br><strong>Submitted images remain your property, but you agree to allow us to use the photos under the terms of a <a href="#" title="Creative Commons Attribution" data-toggle="modal" data-target="#${ImageField.LICENSE_MODAL}">CC BY</a> license.</strong>`
            }
        },
        spread : {
            field: OptionsField,
            attributes: {
                label: 'How does the plant spread in your garden?',
                helpText: '<i>(tick all that apply)</i>',
                options: {
                    "seeds" : {label: "seeds"},
                    "roots" : {label: "roots"},
                    "runners" : {label: "runners"},
                    "bulbs" : {label: "bulbs"},
                    "unknown" : {label: "don't know"},
                    "other" : {label: "other"}
                },
                includeOtherFreeText : true,
                completion: FormField.COMPLETION_DESIRED,
            },
            summary: {
                summaryPrefix: 'Spread by',
            }
        },
        control : {
            field: OptionsField,
            attributes: {
                label: 'How do you control this plant?',
                helpText: '<i>(tick all that apply)</i>',
                options: {
                    "digging" : {label: "digging"},
                    "pulling" : {label: "pulling"},
                    "chemical" : {label: "chemical"},
                    "cutting" : {label: "cutting"},
                    "mulching" : {label: "mulching"},
                    "other" : {label: "other"}
                },
                includeOtherFreeText : true,
                completion: FormField.COMPLETION_DESIRED,
            },
            summary: {
                summaryPrefix: 'Controlled by',
            }
            },
        disposal : {
            field: OptionsField,
            attributes: {
                label: 'Please tell us how you dispose of this plant?',
                helpText: '<i>(tick all that apply)</i>',
                options: {
                    "homecompost" : {label: "home composting"},
                    "greenwaste" : {label: "green waste"},
                    "other waste" : {label: "other waste collection"},
                    "other" : {label: "other"}
                },
                includeOtherFreeText : true,
                completion: FormField.COMPLETION_DESIRED,
            },
            summary: {
                summaryPrefix: 'Disposal by',
            }},
        problemSeverity : {
            field: SelectField,
            attributes: {
                label: 'Which of the following best describes your effort to control the plant?',
                placeholder : 'please select a response',
                options: {
                    '1' : {label: 'I don\'t try to control it'},
                    '2' : {label: 'I try to keep it confined to certain areas.'},
                    '3' : {label: 'I am trying everything to get rid of it.'},
                    '4' : {label: 'I have given up trying to control it.'},
                    '5' : {label: 'I have successfully eradicated the plant.'}
                },
                includeOtherFreeText : false,
                completion: FormField.COMPLETION_DESIRED,
            },
            summary: {
                summaryPrefix: 'Severity:',
            }},
        source : {
            field: OptionsField,
            attributes: {
                label: 'Please tell us how this plant came into your garden?',
                helpText: '<i>(tick all that apply)</i>',
                options: {
                    "alreadypresent" : {label: "Was already in the garden"},
                    "bought" : {label: "Bought the plant"},
                    "seed" : {label: "Grown from seed"},
                    "someoneelse" : {label: "From someone else's garden"},
                    "saleswap" : {label: "Non-commercial sale/swap"},
                    "spread" : {label: "Spread into my garden"},
                    "other" : {label: "other"}
                },
                includeOtherFreeText : true,
                completion: FormField.COMPLETION_DESIRED,
            },
            summary: {
                summaryPrefix: 'Source',
            }},
        // yearsSincePlanted: {
        //     field: InputField,
        //     attributes: {
        //         label: 'How long ago did you plant (years)?',
        //         type: 'number',
        //         helpText: 'Please estimate in years or leave blank if unknown or not applicable',
        //         autocomplete: 'off',
        //     }},
        // yearsProblem: {
        //     field: InputField,
        //     attributes: {
        //         label: 'How quickly did this plant become a problem?',
        //         placeholder: 'number of years',
        //         type: 'number',
        //         helpText: 'Please estimate in years or leave blank if unknown',
        //         autocomplete: 'off',
        //     }},
        // distribution: {
        //     field: OptionsField,
        //     attributes: {
        //         label: 'Have you given the plant away to others?',
        //         helpText: '<i>(tick all that apply)</i>',
        //         options: {
        //             "neighbours" : {label: "Neighbours"},
        //             "sale" : {label: "Plant/charity sale"},
        //             "swap" : {label: "Plant or seed swap"},
        //             "localfriends" : {label: "Local friends"},
        //             "distantfriends" : {label: "Friends further away"},
        //             "other" : {label: "other"}
        //         },
        //         includeOtherFreeText : true
        //     }},
        local : {
            field: SelectField,
            attributes: {
                label: 'Is the plant growing locally outside your garden?',
                //helpText: '(estimate)',
                placeholder : 'please select a response',
                options: {
                    'yes' : {label: 'yes'},
                    'no' : {label: 'no'},
                    'notknown' : {label: "I don't know"}
                },
                includeOtherFreeText : false
            }},
        warning : {
            field: SelectField,
            attributes: {
                label: 'In your opinion, should the plant be sold with a label ' +
                    'warning buyers of potential control difficulties in their garden?',
                placeholder : 'please select a response',
                options: {
                    'yes' : {label: 'Yes', summary: 'Plants should carry a warning'},
                    'no' : {label: 'No', summary: 'Plants need not carry a warning'},
                    'unsure' : {label: "Don't know", summary: "Don't know if plants should carry a warning"}
                },
                includeOtherFreeText : false,
                completion: FormField.COMPLETION_DESIRED,
            },
            summary: {
                summarise: true,
                summaryPrefix: ''
            }},
        comments: {
            field: TextAreaField,
            attributes: {
                label: 'Any other comments about this plant?',
                helpText: '',
                autocomplete: 'off'
            },
            summary: {
                summarise: true,
            }}
    };

    /**
     *
     */
    initialiseFormFields() {
        const properties = NyphOccurrenceForm.properties;

        this.fields = {};

        for (let key in properties) {
            if (properties.hasOwnProperty(key)) {
                // noinspection JSPotentiallyInvalidConstructorUsage
                this.fields[key] = new properties[key].field(properties[key].attributes);
            }
        }
    }

    updateModelFromContent() {
        console.log('updating occurrence from NyphOccurrenceForm content');

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                let field = this.fields[key];

                this.#occurrence.attributes[key] = field.value;
            }
        }

        console.log({occurrence: this.#occurrence});
    }

    /**
     *
     * @param {Occurrence} model
     */
    set model (model) {
        this.#occurrence = model;
        this.populateFormContent();
    }

    get model() {
        return this.#occurrence;
    }

    changeHandler(params) {
        console.log('occurrence form change event');
        console.log({params});

        this.fireEvent(NyphOccurrenceForm.CHANGE_EVENT, {form: this});
    }

    pingOccurrence() {
        if (this.#occurrence.unsaved()) {
            this.fireEvent(NyphOccurrenceForm.CHANGE_EVENT, {form: this});
        }
    }

    destructor() {
        this.#occurrence = null;

        super.destructor();
    }

    getFormSectionProperties() {
        return NyphOccurrenceForm.properties;
    }
}

NyphOccurrenceForm.CHANGE_EVENT = 'change';
