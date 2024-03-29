import {FormField} from "bsbi-app-framework-view";

export class NyphSurveyFormSection {
    /**
     * @type {string}
     */
    static sectionTitle;

    /**
     * @type {number}
     */
    static sectionSortOrder;

    /**
     * @type {string}
     */
    static sectionNavigationKey;

    /**
     * @type {string}
     */
    static help = '';

    /**
     *
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
     */
    static properties;
}

