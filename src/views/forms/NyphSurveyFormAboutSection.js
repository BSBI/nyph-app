import {NyphSurveyFormSection} from "./NyphSurveyFormSection";
import helpPanelText from "../../templates/formHelp/surveyAboutHelp.html";
import {FormField, InputField, SelectField} from "bsbi-app-framework";
import {MapGeorefField} from "../formfields/MapGeorefField";

export class NyphSurveyFormAboutSection extends NyphSurveyFormSection {

    static sectionNavigationKey = 'about';

    /**
     * @type {string}
     */
    static sectionTitle = 'Your details';

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
     * @type {boolean}
     */
    static completionRequired = true;

    /**
     *
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
     */
    static properties = {
        recorder: {
            field: InputField,
            attributes: {
                label: 'Your name',
                helpText: 'This helps us follow-up if we have any queries about your records. If several people are taking part in your Plant Hunt you can list them in the next section.',
                placeholder: 'full name',
                completion: FormField.COMPLETION_COMPULSORY,
                autocomplete: 'name'
            }},
        email: {
            field: InputField,
            attributes: {
                label: 'Your email address',
                helpText: 'We need to be able to send you an acknowledgement email with a link to view and edit your list.',
                autocomplete: 'email',
                type: 'email',
                completion: FormField.COMPLETION_DESIRED,
            }},
    };
}
