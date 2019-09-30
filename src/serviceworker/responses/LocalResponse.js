import localforage from "localforage";
import {packageClientResponse} from "../packageClientResponse";

export class LocalResponse {
    toSaveLocally;
    returnedToClient;

    /**
     * @type {Response}
     */
    prebuiltResponse;

    failureErrorMessage = 'Failed to save a local copy on your device.';
    failureErrorHelp = 'Your internet connection may have failed (or there could be a problem with the server). ' +
        'It wasn\'t possible to save a temporary copy on your device. Perhaps there is insufficient space? ' +
        'Please try to re-establish a network connection and try again.';

    constructor(toSaveLocally, returnedToClient) {
        this.toSaveLocally = toSaveLocally;
        this.returnedToClient = returnedToClient;
    }

    /**
     *
     * @param {Response} prebuiltResponse
     * @returns this
     */
    setPrebuiltResponse(prebuiltResponse) {
        this.prebuiltResponse = prebuiltResponse;
        return this;
    }

    /**
     *
     * @returns {Promise<Response>}
     */
    storeLocally() {
        return localforage.setItem(this.localKey(), this.toSaveLocally).then(() => {
                // console.log(`Stored image ${toSaveLocally.imageId} locally`);
                return this.prebuiltResponse ? this.prebuiltResponse : packageClientResponse(this.returnedToClient);
            },
            (reason) => {
                console.log(`Failed to store object ${this.toSaveLocally.imageId} locally`);
                console.log({reason});
                this.returnedToClient.error = this.failureErrorMessage;
                this.returnedToClient.errorHelp = this.failureErrorHelp;

                return packageClientResponse(this.returnedToClient);
            }
        )
    }

    /**
     * @return {string}
     */
    localKey () {
        throw new Error(`LocalKey must be implemented in a subclass for ${this.toSaveLocally.type}`);
    }
}