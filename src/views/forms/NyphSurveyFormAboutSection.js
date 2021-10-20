import {NyphSurveyFormSection} from "./NyphSurveyFormSection";
import helpPanelText from "../../templates/formHelp/surveyAboutHelp.html";
import {FormField, InputField, SelectField} from "bsbi-app-framework";

export class NyphSurveyFormAboutSection extends NyphSurveyFormSection {

    static sectionNavigationKey = 'about';

    /**
     * @type {string}
     */
    static sectionTitle = 'About you and your survey';

    /**
     * @type {number}
     */
    static sectionSortOrder = 0;

    /**
     * @type {string}
     */
    static help = helpPanelText;

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
            field: InputField,
            attributes: {
                label: 'Postcode or grid-reference',
                helpText: 'We need to be able to put your survey on our map. Detailed locations won\'t be made public.',
                placeholder: 'Grid-reference or postcode',
                autocomplete: 'postal-code',
                completion: FormField.COMPLETION_COMPULSORY,
            }},
        recorder: {
            field: InputField,
            attributes: {
                label: 'Your name',
                helpText: '(optional) This helps us follow-up if we have any queries about your records and allows us to properly acknowledge the origin of your observations.',
                placeholder: 'full name',
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
                completion: FormField.COMPLETION_DESIRED,
            }},
        email: {
            field: InputField,
            attributes: {
                label: 'Your email address',
                helpText: '(optional) We\'ll never share your email with anyone else.',
                autocomplete: 'email',
                type: 'email'
            }},
    };
}
