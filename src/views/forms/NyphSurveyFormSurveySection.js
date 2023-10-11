import {NyphSurveyFormSection} from "./NyphSurveyFormSection";
import helpPanelText from "../../templates/formHelp/surveyAboutHelp.html";
import {
    DateField,
    FormField,
    InputField,
    SelectField,
    TextAreaField,
    MapGeorefField,
    RepeaterField, PartyField
} from "bsbi-app-framework-view";

export class NyphSurveyFormSurveySection extends NyphSurveyFormSection {

    static sectionNavigationKey = 'yoursurvey';

    /**
     * @type {string}
     */
    static sectionTitle = 'Your plant hunt';

    /**
     * @type {number}
     */
    static sectionSortOrder = 1;

    /**
     * @type {string}
     */
    static help = helpPanelText;

    /**
     *
     * @type {boolean}
     */
    static completionRequired = true;

    /**
     *
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
     */
    static properties = {
        place: {
            field: InputField,
            attributes: {
                label: 'Where did you survey?',
                helpText: 'e.g. town or village. Please don\'t give an address.',
                placeholder: 'Nearest named place',
                autocomplete: 'address-level2',
                completion: FormField.COMPLETION_COMPULSORY,
                validationMessage: 'Please enter the place that you surveyed.'
            }},
        georef: {
            field: MapGeorefField,
            attributes: {
                label: 'Starting point of your walk.',
                helpText: 'Enter a grid-reference, search by place name or postcode or use the GPS button',
                placeholder: 'Grid-reference, place or postcode',
                completion: FormField.COMPLETION_COMPULSORY,
                validationMessage: 'Please specify an approximate starting point for the survey. You can do this by typing a grid-reference, clicking the GPS button, selecting a place from the drop-down list or by clicking on the map.',
                includeSearchBox: true,
                baseSquareResolution: 2000, // resolution to use for geocoded lookups
                gpsTextLabel: true,
                gpsInitialisationMode: MapGeorefField.GPS_INITIALISATION_MODE_PERMITTED,
            }},
        date: {
            field: DateField,
            attributes: {
                label: 'Date',
                helpText: 'When did you survey? <strong>Please start a new list if you explore for a second day.</strong>',
                placeholder: 'date',
                type: 'date',
                completion: FormField.COMPLETION_COMPULSORY,
                minDate: '2023-10-01',
                maxDate: '2024-01-04',
            }
        },
        // people: {
        //     field: InputField,
        //     attributes: {
        //         label: 'Who is taking part',
        //         helpText: "(optional) Please list everyone who is taking part - we'd like to be able to acknowledge your efforts.",
        //         placeholder: 'Name(s)',
        //         completion: FormField.COMPLETION_OPTIONAL,
        //         autocomplete: 'name'
        //     }},
        people: {
            field: RepeaterField,
            attributes: {
                label: 'Who is taking part',
                wrappedFieldClass: PartyField,
                wrappedAttributes: {
                    label: '',
                    placeholder: 'name',
                    autocomplete: 'name',
                    role: PartyField.ROLE_RECORDER,
                }
            },
            helpText: 'Please name each person separately',
            validationMessage: 'Please provide one or more recorder names',
            completion: FormField.COMPLETION_COMPULSORY,
        },
        numberofrecorders: {
            field: InputField,
            attributes: {
                label: 'How many people in your party?',
                helpText: "(optional) It helps us with funding and publicity to know participation across the whole country.",
                placeholder: '',
                type: 'number'
            }},
        namearchive: {
            field: SelectField,
            attributes: {
                label: 'Can we include your name in our archive of plant records?',
                helpText: '',
                placeholder : 'please choose an option',
                options: {
                    "yes" : {label: "yes"},
                    "no" : {label: "no, I'd prefer my records to be anonymous"},
                },
                includeOtherFreeText : false,
                validationMessage: 'Please let us know your choice for this question.',
                completion: FormField.COMPLETION_COMPULSORY,
            }},
        listname: {
            field: InputField,
            attributes: {
                label: 'Expedition title?',
                helpText: '(optional) how we should label your list on the results page',
                placeholder: '',
                autocomplete: '',
                completion: FormField.COMPLETION_OPTIONAL,
            }},
        comments: {
            field: TextAreaField,
            attributes: {
                label: 'Any other notes about your plant hunt',
                helpText: "(optional) You could describe the route or mention exceptional finds. Comments here will appear on the public website. We'll email you a separate feedback form at the end.",
                autocomplete: 'off'
            },
            summary: {
                summarise: true,
            }}
    };
}
