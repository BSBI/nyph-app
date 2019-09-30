// a Survey captures the currentSurvey meta data
// i.e. it captures site details (name, location); user details (name, email)
//
// if a user were to submit multiple surveys then they would end up in the contact database multiple times
// this is probably unavoidable. Not worth the effort and risk of automatic de-duplication. Email preferences would be
// shared, keyed by email.

import {Model} from "./Model";
import {PlantAlertSurveyForm} from "../views/forms/PlantAlertSurveyForm";
import {escapeHTML} from "../utils/escapeHTML";

export class Survey extends Model {

    /**
     * fired from Survey when the object's contents have been modified
     *
     * @type {string}
     */
    static EVENT_MODIFIED = 'modified';

    SAVE_ENDPOINT = '/savesurvey.php';

    TYPE = 'survey';

    /**
     *
     * @type {Object.<string, *>}
     */
    attributes = {

    };

    /**
     * called after the form has changed, before the values have been read back in to the occurrence
     *
     * @param context
     * @param {string} eventName
     * @param {{form: PlantAlertSurveyForm}} params
     */
    formChangedHandler(context, eventName, params) {
        console.log('Survey change handler invoked.');

        // read new values
        // then fire it's own change event (Occurrence.EVENT_MODIFIED)
        params.form.updateModelFromContent();

        // refresh the form's validation state
        params.form.conditionallyValidateForm();

        this.touch();
        this.fireEvent(Survey.EVENT_MODIFIED, {surveyId : this.id});
    }

    /**
     * @param {PlantAlertSurveyForm} form
     */
    registerForm(form) {
        form.model = this;
        form.addListener(PlantAlertSurveyForm.CHANGE_EVENT, this, this.formChangedHandler);
    }

    /**
     * if not securely saved then makes a post to /savesurvey.php
     *
     * this may be intercepted by a service worker, which could write the image to indexdb
     * a successful save will result in a json response containing the uri from which the image may be retrieved
     * and also the state of persistence (whether or not the image was intercepted by a service worker while offline)
     *
     * if saving fails then the expectation is that there is no service worker, in which case should attempt to write
     * the image directly to indexdb
     *
     * must test indexdb for this eventuality after the save has returned
     *
     * @returns {Promise}
     */
    save() {
        if (!this._savedRemotely) {
            const formData = new FormData;

            formData.append('type', this.TYPE);
            formData.append('surveyId', this.id);
            formData.append('projectId', this.projectId.toString());
            formData.append('attributes', JSON.stringify(this.attributes));
            formData.append('deleted', this.deleted.toString());
            formData.append('created', this.createdStamp.toString());

            console.log('queueing survey post');
            return this.queuePost(formData);
        } else {
            return Promise.reject(`${this.id} has already been saved.`);
        }
    }

    /**
     *
     * @returns {string} an html-safe string based on the locality and creation date
     */
    generateSurveyName() {
        let place = (this.attributes.place || this.attributes.georef || '(unlocalised)').trim();
        const createdDate = new Date(this.createdStamp * 1000);

        let dateString;
        try {
            // 'default' locale fails on Edge
            dateString = createdDate.toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});
        } catch (e) {
            dateString = createdDate.toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
        }

        return `${escapeHTML(place)} ${dateString}`;
    }
}
