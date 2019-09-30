// mock some occurrences

import {Occurrence} from "../models/Occurrence";

/**
 *
 * @param {PlantAlertApp} app
 */
export default function (app) {
    for (let i = 0; i < 10; i++) {
        const occurrence = new Occurrence();

        occurrence.attributes.taxon = {
            taxonId : '2cd4p9h.xt1',
            taxonName: 'Poa annua',
            vernacularMatch: false
        };

        occurrence.attributes.comments = `some fake notes for occurrence number ${i}.`;
        occurrence.attributes.spread = {selection: [], other: null};
        occurrence.attributes.problemSeverity = {selection: [], other: null};
        occurrence.attributes.images = {images : []};

        occurrence.surveyId = app.currentSurvey.id;
        occurrence.projectId = app.projectId;

        app.addOccurrence(occurrence);
    }
};