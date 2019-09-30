import {Taxon} from "../models/Taxon";

export class TaxaLoadedHook {
    static callbackStack = [];

    static taxaLoadedEntryPoint() {
        Taxon.rawTaxa = BsbiDb.TaxonNames;
        while (TaxaLoadedHook.callbackStack.length) {
            const callback = TaxaLoadedHook.callbackStack.shift();
            try {
                callback();
            } catch (e) {
                console.log({'Exception after taxon load' : e});
            }
        }
    }

    /**
     *
     * @returns {Promise<any>|Promise<void>}
     */
    static onceTaxaLoaded() {
        if (BsbiDb.hasOwnProperty('TaxonNames')) {
            return Promise.resolve();
        } else {
            if (!BsbiDb.taxonNamesLoadedEntryPoint) {
                BsbiDb.taxonNamesLoadedEntryPoint = TaxaLoadedHook.taxaLoadedEntryPoint;
            }

            return new Promise(
                (resolve) => {
                    TaxaLoadedHook.callbackStack.push(resolve);
                }
            );
        }
    }
}

