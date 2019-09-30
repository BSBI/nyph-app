import {InputField} from "../formfields/InputField";
import {SelectField} from "../formfields/SelectField";
import {NyphSurveyFormSection} from "./NyphSurveyFormSection";
import helpPanelText from "../../templates/formHelp/surveyGardenHelp.html";
import {OptionsField} from "../formfields/OptionsField";
import {FormField} from "../formfields/FormField";

export class NyphSurveyFormGardenSection extends NyphSurveyFormSection {

    /**
     * @type {string}
     */
    static sectionNavigationKey = 'garden';

    /**
     * @type {string}
     */
    static sectionTitle = 'About your garden';

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
     * @type {Object.<string,{field: typeof FormField, attributes: {label: string, helpText: string, placeholder: string, autocomplete: string}}>}
     */
    static properties = {
        // gardenSize : {
        //     field: SelectField,
        //     attributes: {
        //         label: 'What is the size of your garden?',
        //         //helpText: '(estimate)',
        //         placeholder : 'please estimate',
        //         options: {
        //             '<50' : {label: 'less than 50m²'},
        //             '50-100' : {label: '50m² to 100m²'},
        //             '100-200' : {label: '100m² to 200m²'},
        //             '200-400' : {label: '200m² to 400m²'},
        //             '400-800' : {label: '400m² to 800m²'},
        //             '>800' : {label: 'more than 800m²'}
        //         },
        //         includeOtherFreeText : false,
        //         completion: FormField.COMPLETION_DESIRED,
        //     }},
        // areaAge : {
        //     field: SelectField,
        //     attributes: {
        //         label: 'Estimated age of the residential area your garden is located in?',
        //         //helpText: '(estimate)',
        //         placeholder : 'please estimate',
        //         options: {
        //             '<1800' : {label: 'before 1800'},
        //             '1800-1899' : {label: '19th century'},
        //             '1900-1959' : {label: '1900-1960'},
        //             '1960-1989' : {label: '1960-1980s'},
        //             '1990-' : {label: '1990s onwards'}
        //         },
        //         includeOtherFreeText : false
        //     }},
        durationAtAddress: {
            field: InputField,
            attributes: {
                label: 'Roughly how long have you lived at this address?',
                //helpText: '',
                placeholder: 'approximate years',
                type: 'number'
            }},
        numberOfPlants : {
            field: SelectField,
            attributes: {
                label: 'Could you please try to estimate how many different ornamental plants are growing in your garden?',
                //helpText: '(estimate)',
                placeholder : 'please estimate',
                options: {
                    '<20' : {label: 'fewer than 20'},
                    '20-50' : {label: 'between 20 and 50'},
                    '50-100' : {label: 'between 50 and 100'},
                    '>100' : {label: 'more than 100'},
                    'unknown' : {label: 'impossible to estimate'}
                },
                includeOtherFreeText : false,
                completion: FormField.COMPLETION_DESIRED,
            }},
        introductions: {
            field: InputField,
            attributes: {
                label: 'In the last year, how many new ornamental plant species did you plant/introduce into your garden?',
                helpText: 'please estimate',
                placeholder: 'number of plants',
                autocomplete: 'off',
                type: 'number'
            }},
        acquisitions: {
            field: OptionsField,
            attributes: {
                label: 'In the last year, where did you get these new plants or seeds?',
                helpText: '<i>(tick all that apply)</i>',
                options: {
                    "nursery" : {label: "bought from nursery"},
                    "gardencentre" : {label: "bought at garden centre"},
                    "supermarket" : {label: "bought at supermarket"},
                    "mailorder" : {label: "mail-order"},
                    "internetorder" : {label: "internet order"},
                    "friendsneighbours" : {label: "from friends or neighbours"},
                    "swap" : {label: "plant / seed swap"},
                    "other" : {label: "other"}
                },
                includeOtherFreeText : true
            }},
        gifts : {
            field: SelectField,
            attributes: {
                label: 'In the last two years, did you give plants/seeds to friends/neighbours?',
                //helpText: '(estimate)',
                placeholder : 'please select a response',
                options: {
                    'yes' : {label: 'yes'},
                    'no' : {label: 'no'}
                },
                includeOtherFreeText : false
            }},
    };
}
