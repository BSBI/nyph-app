import {NyphSurveyFormSection} from "./NyphSurveyFormSection";
import helpPanelText from "../../templates/formHelp/surveyAboutHelp.html";
import {FormField, InputField, SelectField} from "bsbi-app-framework";
import {MapGeorefField} from "../formfields/MapGeorefField";

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
            }},
        georef: {
            field: MapGeorefField,
            attributes: {
                label: 'Starting point of your walk.',
                helpText: 'We need to be able to put your survey on our map.',
                placeholder: 'Grid-reference or postcode',
                //autocomplete: 'postal-code',
                completion: FormField.COMPLETION_COMPULSORY,
                baseSquareResolution: 1000,
                gpsInitialisationMode: MapGeorefField.GPS_INITIALISATION_MODE_PERMITTED,
            }},
        recorder: {
            field: InputField,
            attributes: {
                label: 'Who is taking part',
                helpText: "(optional) Please list everyone who is taking part - we'd like to be able to acknowledge your efforts.",
                placeholder: 'Name(s)',
                completion: FormField.COMPLETION_DESIRED,
                autocomplete: 'name'
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
                completion: FormField.COMPLETION_COMPULSORY,
            }},
    };
}
