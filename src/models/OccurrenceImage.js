import {Model} from "./Model";

export class OccurrenceImage extends Model {

    /**
     * raw file object retrieved from a file upload image element
     *
     * @type {File}
     */
    file;

    /**
     *
     * @type {Map.<string, OccurrenceImage>}
     */
    static imageCache = new Map;

    TYPE = 'image';

    /**
     * fetches a url of the image
     * this might be a remote url (or one intercepted by a service worker)
     * or a data url of the raw image, (not yet uploaded)
     *
     * @returns {string}
     */
    getUrl () {

    }

    SAVE_ENDPOINT = '/saveimage.php';

    /**
     *
     * @param {File} file
     */
    static fromFile(file) {
        const image = new OccurrenceImage;
        image.file = file;

        return image;
    }

    /**
     * if not securely saved then makes a post to /saveimage.php
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
     * @param {string} occurrenceId
     * @param {number} projectId
     * @returns {Promise}
     */
    save(surveyId, occurrenceId, projectId) {
        if (!this._savedRemotely) {

            const formData = new FormData;
            formData.append('type', this.TYPE);
            formData.append('surveyId', surveyId);
            formData.append('occurrenceId', occurrenceId);
            formData.append('projectId', projectId.toString());
            formData.append('imageId', this.id);
            formData.append('image', this.file);
            formData.append('deleted', this.deleted.toString());

            console.log(`queueing image post, image id ${this.id}`);
            return this.queuePost(formData);
        } else {
            return Promise.reject(`${this.id} has already been saved.`);
        }
    }

    /**
     * fired from Occurrence when the object's contents have been modified
     *
     * @type {string}
     */
    static EVENT_MODIFIED = 'modified';

    /**
     *
     * @param id
     * @returns {OccurrenceImage}
     */
    static placeholder(id) {
        let placeholderObject = new OccurrenceImage;
        placeholderObject._id = id;

        OccurrenceImage.imageCache.set(id, placeholderObject);

        return placeholderObject;
    }

    /**
     *
     * @param {{surveyId: string, occurrenceId: string, [image]: File}} descriptor
     * @private
     */
    _parseDescriptor(descriptor) {
        super._parseDescriptor(descriptor);
        this.surveyId = descriptor.surveyId; // note lower case
        this.occurrenceId = descriptor.occurrenceId; // note lower case
        this.file = descriptor.image;
    }

    /**
     *
     * @param {string} id
     * @param {(number|null)} width
     * @param {(number|null)} height
     * @param {{[className] : string}} [attributes]
     * @return {string}
     */
    static imageLink(id, width, height, attributes) {
        width = width || 0;
        height = height || 0;

        let attributesString = '';

        if (attributes.className) {
            attributesString += ` class="${attributes.className}"`;
        }

        const renderingConstraint = (width > height) ?
            `width="${width}"`
            :
            `height="${height}"`;

        return `<picture><source srcset="/image.php?imageid=${id}&amp;height=128&amp;format=webp" type="image/webp"><img${attributesString} src="/image.php?imageid=${id}&amp;width=${width}&amp;height=${height}&amp;format=jpeg" ${renderingConstraint} alt="photo"></picture>`;
    }
}