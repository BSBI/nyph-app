import BsbiDb from "BsbiDb";
import {TaxonError} from "../utils/exceptions/TaxonError";
import {escapeHTML} from "../utils/escapeHTML";

export class Taxon {
    /**
     * @typedef RawTaxon
     * @type {array}
     * @property {string} 0 - nameString
     * @property {(string|number)} 1 - canonical
     * @property {string} 2 hybridCanonical, raw entry is 0 if canonical == hybridCanonical
     * @property {(string|number)} 3 acceptedEntityId or 0 if name is accepted
     * @property {string} 4 qualifier
     * @property {string} 5 authority
     * @property {string} 6 vernacular
     * @property {string} 7 vernacularRoot
     * @property {number} 8 used
     * @property {number} 9 sortOrder
     * @property {Array.<string>} 10 parentIds
     */

    /**
     *
     * @type {Object.<string, RawTaxon>}
     */
    static rawTaxa = BsbiDb.TaxonNames;

    /**
     * @type {string}
     */
    id;

    /**
     *
     * @type {string}
     */
    nameString = '';

    /**
     *
     * @type {string}
     */
    canonical = '';

    /**
     *
     * @type {string}
     */
    hybridCanonical = '';

    /**
     *
     * @type {string}
     */
    acceptedEntityId = '';

    /**
     *
     * @type {string}
     */
    qualifier = '';

    /**
     *
     * @type {string}
     */
    authority = '';

    /**
     *
     * @type {string}
     */
    vernacular = '';

    /**
     *
     * @type {string}
     */
    vernacularRoot = '';

    /**
     * @type {boolean}
     */
    used;

    /**
     * @type {number}
     */
    sortOrder;

    /**
     *
     * @type {Array.<string>}
     */
    parentIds = [];

    /**
     *
     * @type {boolean}
     */
    static showVernacular = true;

    /**
     *
     * @param {string} id
     * @returns {Taxon}
     * @throws {TaxonError}
     */
    static fromId (id) {
        if (!Taxon.rawTaxa) {
            // may not yet have been initialised due to deferred loading

            if (BsbiDb.TaxonNames) {
                Taxon.rawTaxa = BsbiDb.TaxonNames;
            } else {
                throw new TaxonError(`Taxon.fromId() called before taxon list has loaded.`);
            }
        }

        if (!Taxon.rawTaxa.hasOwnProperty(id)) {
            throw new TaxonError(`Taxon id '${id}' not found.`);
        }

        const raw = Taxon.rawTaxa[id];

        const taxon = new Taxon;

        taxon.id = id;
        taxon.nameString = raw[0];
        taxon.canonical = raw[1] || raw[0]; // raw entry is blank if namesString == canonical
        taxon.hybridCanonical = raw[2] || taxon.canonical; // raw entry is blank if canonical == hybridCanonical
        taxon.acceptedEntityId = raw[3] || id;
        taxon.qualifier = raw[4];
        taxon.authority = raw[5];
        taxon.vernacular = raw[6];
        taxon.vernacularRoot = raw[7];
        taxon.used = raw[8];
        taxon.sortOrder = raw[9];
        taxon.parentIds = raw[10];

        return taxon;
    }

    /**
     *
     * @param {boolean} vernacularMatched
     * @returns {string}
     */
    formattedHTML(vernacularMatched) {
        let acceptedTaxon;
        if (this.id !== this.acceptedEntityId) {
            acceptedTaxon = Taxon.fromId(this.acceptedEntityId);
        }

        if (Taxon.showVernacular) {
            if (vernacularMatched) {
                return (acceptedTaxon) ?
                    `<q><b>${escapeHTML(this.vernacular)}</b></q> <span class="italictaxon">${this.nameString}${this.qualifier ? ` <b>${this.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>` +
                        ` = <span class="italictaxon">${acceptedTaxon.nameString}${acceptedTaxon.qualifier ? ` <b>${acceptedTaxon.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(acceptedTaxon.authority)}</span>`
                    :
                    `<q><b>${escapeHTML(this.vernacular)}</b></q> <span class="italictaxon">${this.nameString}${this.qualifier ? ` <b>${this.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>`
                    ;
            } else {
                return (acceptedTaxon) ?
                    `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <b>${this.qualifier}</b>` : ''}</span> <span class="taxauthority">${this.authority}</span>${this.vernacular ? ` <q><b>${escapeHTML(this.vernacular)}</b></q>` : ''
                        } = <span class="italictaxon">${acceptedTaxon.nameString}${acceptedTaxon.qualifier ? ` <b>${acceptedTaxon.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(acceptedTaxon.authority)}</span>`
                    :
                    `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <b>${this.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>${this.vernacular ? ` <q><b>${escapeHTML(this.vernacular)}</b></q>` : ''}`
                    ;
            }
        } else {
            return (acceptedTaxon) ?
                `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <b>${this.qualifier}</b>` : ''}</span> <span class="taxauthority">${this.authority}</span>` +
                    ` = <span class="italictaxon">${acceptedTaxon.nameString}${acceptedTaxon.qualifier ? ` <b>${acceptedTaxon.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(acceptedTaxon.authority)}</span>`
                :
                `<span class="italictaxon">${this.nameString}${this.qualifier ? ` <b>${this.qualifier}</b>` : ''}</span> <span class="taxauthority">${escapeHTML(this.authority)}</span>`
                ;
        }
    }
}
