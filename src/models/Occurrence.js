import {Model} from "./Model";
import {Taxon} from "./Taxon";
import {PlantAlertOccurrenceForm} from "../views/forms/PlantAlertOccurrenceForm";

export class Occurrence extends Model {

    /**
     *
     * @type {Object.<string, *>}
     */
    attributes = {
        // taxon: {
        //     taxonId: '',
        //     taxonName: '',
        //     vernacularMatch: false
        // }
    };

    /**
     * set if the image has been posted to the server
     * (a local copy might still exist, which may have been reduced to thumbnail resolution)
     *
     * @type {boolean}
     */
    _savedRemotely = false;

    /**
     * set if the image has been added to a temporary store (e.g. indexedDb)
     *
     * @type {boolean}
     */
    _savedLocally = false;

    SAVE_ENDPOINT = '/saveoccurrence.php';

    TYPE = 'occurrence';

    /**
     * fired from Occurrence when the object's contents have been modified
     *
     * @type {string}
     */
    static EVENT_MODIFIED = 'modified';

    /**
     * set if this is a new entry (before user has moved on to the next entry)
     * influences whether form validation errors are displayed
     *
     * @type {boolean}
     */
    isNew = false;

    /**
     *
     * @returns {(Taxon|null)} returns null for unmatched taxa specified by name
     */
    get taxon() {
        return this.attributes.taxon && this.attributes.taxon.taxonId ? Taxon.fromId(this.attributes.taxon.taxonId) : null;
    };

    /**
     *
     * @returns {PlantAlertOccurrenceForm}
     */
    getForm() {
        const form = new PlantAlertOccurrenceForm(this);
        if (!this.isNew) {
            form.liveValidation = true;
        }

        form.addListener(PlantAlertOccurrenceForm.CHANGE_EVENT, this, this.formChangedHandler);
        return form;
    }

    /**
     * called after the form has changed, before the values have been read back in to the occurrence
     *
     * @param context
     * @param {string} eventName
     * @param {{form: PlantAlertOccurrenceForm}} params
     */
    formChangedHandler(context, eventName, params) {
        console.log('Occurrence change handler invoked.');

        // read new values
        // then fire it's own change event (Occurrence.EVENT_MODIFIED)
        params.form.updateModelFromContent();

        // refresh the form's validation state
        params.form.conditionallyValidateForm();

        this.touch();
        this.fireEvent(Occurrence.EVENT_MODIFIED, {occurrenceId : this.id});
    }

    delete() {
        if (!this.deleted) {
            this.touch();
            this.deleted = true;

            this.fireEvent(Occurrence.EVENT_MODIFIED, {occurrenceId : this.id});
        }
    }

    /**
     * if not securely saved then makes a post to /saveoccurrence.php
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
     * @param {string} surveyId
     * @returns {Promise}
     */
    save(surveyId) {
        if (!this._savedRemotely) {
            const formData = new FormData;

            formData.append('type', this.TYPE);
            formData.append('surveyId', surveyId);
            formData.append('occurrenceId', this.id);
            formData.append('projectId', this.projectId.toString());
            formData.append('attributes', JSON.stringify(this.attributes));
            formData.append('deleted', this.deleted.toString());
            formData.append('created', this.createdStamp.toString());

            console.log('queueing occurrence post');
            return this.queuePost(formData);
        } else {
            return Promise.reject(`${this.id} has already been saved.`);
        }
    }

    /**
     *
     * @param {{id : string, saveState: string, attributes: Object.<string, *>, deleted: boolean, created: number, modified: number, projectId: number, surveyId: string}} descriptor
     */
    _parseDescriptor(descriptor) {
        super._parseDescriptor(descriptor);
        this.surveyId = descriptor.surveyId;
    }
}
