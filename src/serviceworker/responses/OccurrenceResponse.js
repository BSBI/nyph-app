import {ResponseFactory} from "./ResponseFactory";
import {LocalResponse} from "./LocalResponse";
import {SAVE_STATE_LOCAL, SAVE_STATE_SERVER} from "../../models/Model";

export class OccurrenceResponse extends LocalResponse {
    failureErrorMessage = 'Failed to store occurrence.';
    failureErrorHelp = 'Your internet connection may have failed (or there could be a problem with the server). ' +
        'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' +
        'Please try to re-establish a network connection and try again.';

    /**
     * called to build the response to the post that is returned to the client
     * in the absence of the remote server
     *
     * @returns {this}
     */
    populateClientResponse() {
        this.returnedToClient.id = this.toSaveLocally.occurrenceId;
        this.returnedToClient.type = 'occurrence';
        this.returnedToClient.surveyId = this.toSaveLocally.surveyId;
        this.returnedToClient.attributes = this.toSaveLocally.attributes;
        this.returnedToClient.created = 0 + this.toSaveLocally.created; // stamps from server always take precedence
        this.returnedToClient.modified = 0 + this.toSaveLocally.modified;
        this.returnedToClient.saveState = SAVE_STATE_LOCAL;
        this.returnedToClient.deleted = this.toSaveLocally.deleted;
        this.returnedToClient.projectId = 0 + this.toSaveLocally.projectId;
        return this;
    }

    /**
     * called to mirror a response from the server locally
     *
     * @returns {this}
     */
    populateLocalSave() {
        this.toSaveLocally.occurrenceId = this.returnedToClient.id;
        this.toSaveLocally.type = 'occurrence';
        this.toSaveLocally.surveyId = this.returnedToClient.surveyId;
        this.toSaveLocally.attributes = this.returnedToClient.attributes;
        this.toSaveLocally.created = 0 + this.returnedToClient.created; // stamps from server always take precedence
        this.toSaveLocally.modified = 0 + this.returnedToClient.modified;
        this.toSaveLocally.saveState = SAVE_STATE_SERVER;
        this.toSaveLocally.deleted = this.returnedToClient.deleted;
        this.toSaveLocally.projectId = 0 + this.returnedToClient.projectId;

        return this;
    }

    /**
     *
     * @returns {string}
     */
    localKey() {
        return `occurrence.${this.toSaveLocally.occurrenceId}`;
    }

    static register() {
        ResponseFactory.responses.occurrence = OccurrenceResponse;
    }
}