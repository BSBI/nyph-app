/** ****************************************************************************
 * Generates species list suggestions.
 *****************************************************************************/

import {Taxon} from '../../models/Taxon';

export class TaxonSearch {

    /**
     * see TaxonRank::sort
     *
     * @type int|null
     */
    minimumRankSort = null;

    /**
     * if set then only taxa with records are returned
     *
     * @type boolean
     */
    requireExtantDDbRecords = false;

    // /**
    //  * if set then only taxa with records present in the specified status scheme (scheme id code)
    //  * (default null)
    //  *
    //  * @type string|null
    //  */
    // requiredStatusSchemeId = null;

    /**
     * if set then require that returned taxon names are >= 3 letters
     * and don't contain numerals
     *
     * @type boolean
     */
    skipJunk = true;

    /**
     * (static config setting)
     *
     * @type {boolean}
     */
    static showVernacular = true;

    static MIN_SEARCH_LENGTH = 2;

    static MAXIMUM_RESULTS = 25;

    constructor() {
        if (!Taxon.rawTaxa) {
            Taxon.rawTaxa = BsbiDb.TaxonNames;

            if (!Taxon.rawTaxa) {
                throw new Error('Taxon list has failed to load in TaxonSearch');
            }
        }
    }

    /**
     *
     * @param {object} taxonResult
     * @param {string} queryString
     * @returns {string}
     */
    static formatter(taxonResult, queryString = '') {
        if (TaxonSearch.showVernacular) {
            if (taxonResult.vernacularMatched) {
                if (taxonResult.acceptedEntityId) {
                    return `<q><b>${taxonResult.vernacular}</b></q> <span class="italictaxon">${taxonResult.uname}${taxonResult.qualifier ? ` <b>${taxonResult.qualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.authority}</span>` +
                        ` = <span class="italictaxon">${taxonResult.acceptedNameString}${taxonResult.acceptedQualifier ? ` <b>${taxonResult.acceptedQualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.acceptedAuthority}</span>`;
                }
                return `<q><b>${taxonResult.vernacular}</b></q> <span class="italictaxon">${taxonResult.uname}${taxonResult.qualifier ? ` <b>${taxonResult.qualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.authority}</span>`;
            }
            if (taxonResult.acceptedEntityId) {
                return `<span class="italictaxon">${taxonResult.uname}${taxonResult.qualifier ? ` <b>${taxonResult.qualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.authority}</span>${taxonResult.vernacular ? ` <q><b>${taxonResult.vernacular}</b></q>` : ''
                    } = <span class="italictaxon">${taxonResult.acceptedNameString}${taxonResult.acceptedQualifier ? ` <b>${taxonResult.acceptedQualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.acceptedAuthority}</span>`;
            }
            return `<span class="italictaxon">${taxonResult.uname}${taxonResult.qualifier ? ` <b>${taxonResult.qualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.authority}</span>${taxonResult.vernacular ? ` <q><b>${taxonResult.vernacular}</b></q>` : ''}`;
        }
        if (taxonResult.acceptedEntityId) {
            return `<span class="italictaxon">${taxonResult.uname}${taxonResult.qualifier ? ` <b>${taxonResult.qualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.authority}</span>` +
                ` = <span class="italictaxon">${taxonResult.acceptedNameString}${taxonResult.acceptedQualifier ? ` <b>${taxonResult.acceptedQualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.acceptedAuthority}</span>`;
        }
        return `<span class="italictaxon">${taxonResult.uname}${taxonResult.qualifier ? ` <b>${taxonResult.qualifier}</b>` : ''}</span> <span class="taxauthority">${taxonResult.authority}</span>`;
    }

    static abbreviatedGenusRegex = /^(X\s+)?([a-z])[.\s]+(.*?)$/i;

    static nameStringColumn = 0;
    static canonicalColumn = 1;
    static hybridCanonicalColumn = 2;
    static acceptedEntityIdColumn = 3;
    static qualifierColumn = 4;
    static authorityColumn = 5;
    static vernacularColumn = 6;
    static vernacularRootColumn = 7;
    static usedColumn = 8;
    static minRankColumn = 9;

    static taxonRankNameSearchRegex = [
        /\s+sub-?g(?:en(?:us)?)?[.\s]+/i,
        /\s+sect(?:ion)?[.\s]+/i,
        /\s+subsect(?:ion)?[.\s]+/i,
        /\s+ser(?:ies)?[.\s]+/i,
        /\s+gp[.\s]+/i,
        /\s+s(?:ub)?-?sp(?:ecies)?[.\s]+/i,
        /\s+morphotype\s+/i,
        /\s+var[.\s]+/i,
        /\s+cv[.\s]+/i,
        /\s+n(?:otho)?v(?:ar)?[.\s]+/i,
        /\s+f[.\s]+|\s+forma?\s+/i,
        /\s+n(?:otho)?ssp[.\s]+/i,
    ];

    static taxonRankNameReplacement = [
        ' subg. ',
        ' sect. ',
        ' subsect. ',
        ' ser. ',
        ' group ',
        ' subsp. ',
        ' morph. ',
        ' var. ',
        ' cv. ', // ddb preference is for single quotes for cultivars
        ' nothovar. ',
        ' f. ',
        ' nothosubsp. ',
    ];

    /**
     * well-formed ranks, used for stripping rank from name for results table sorting
     *
     * @type RegExp
     */
    static cleanRankNamesRegex = /\s(subfam\.|subg\.|sect\.|subsect\.|ser\.|subser\.|subsp\.|nothosubsp\.|microsp\.|praesp\.|agsp\.|race|convar\.|nm\.|microgene|f\.|subvar\.|var\.|nothovar\.|cv\.|sublusus|taxon|morph\.|group|sp\.)\s/;

    /**
     *
     * @type Array *DON'T COPY THESE YET, AS THEY ARE AN UNOPTIMIZED MESS!*
     */
    static taxonQualifierSearchRegex = [
        /\s*\(?\bf\s*x\s*m or m\s*x\s*f\)?\s*$/i,
        /\s*\(?\bm\s*x\s*f or f\s*x\s*m\)?\s*$/i,

        // '/\b\s*\(?f\s*x\s*m\)?\s*$/i',
        // '/\b\s*\(?m\s*x\s*f\)?\s*$/i',
        /\s*\(?\bf\s*x\s*m\)?\s*$/i,
        /\s*\(?\bm\s*x\s*f\)?\s*$/i,

        // '/\b\s*\(?female\s*x\s*male\)?\s*$/i',
        // '/\b\s*\(?male\s*x\s*female\)?\s*$/i',
        /\s*\(?\bfemale\s*x\s*male\)?\s*$/i,
        /\s*\(?\bmale\s*x\s*female\)?\s*$/i,

        // stand-alone male/female qualifier (e.g. applied to Petasites hybridus)
        // removes single quotes
        /\s*'male'\s*$/i,
        /\s*'female'\s*$/i,

        // mid-string ss/sl qualifiers
        /\b\s*sens\.?\s*lat[.\s]+/i,
        /\b\s*s\.\s*lat\.?\s*\b/i,
        /\b\s*s\.?\s*l\.?\s+\b/i,
        /\b\s*sensu\s*lato\s+\b|\(\s*sensu\s*lato\s*\)/i,

        /\b\s*sensu\s*stricto\s+\b|\(\s*sensu\s*stricto\s*\)/i,
        /\b\s*sens\.?\s*strict[.\s]+/i,

        // '/\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str\.?\s*\b/i', // the first look-ahead option matches before a closing-paren (\b fails between '.)' )
        /\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str[.\s]+/i,
        // '/\b\s*s\.\s*str\.?\s*\b/i',
        /\b\s*s\.\s*str[.\s]+/i,
        /\b\s*s\.?\s*s\.?\s+\b/i,

        // end-of-string ss/sl qualifiers
        /\b\s*sens\.?\s*lat\.?\s*$/i,
        /\b\s*s\.\s*lat\.?\s*$/i,
        /\b\s*s\.?\s*l\.?\s*$/i,
        /\b\s*sensu\s*lato\s*$/i,

        /\b\s*sensu\s*stricto\s*$/i,
        /\b\s*sens\.?\s*strict\.?\s*$/i,
        /\b\s*sens\.?\s*str\.?\s*$/i,
        /\b\s*s\.\s*str\.?\s*$/i,
        /\b\s*s\.?\s*s\.?\s*$/i,

        /\b\s*agg\.?\s*$/i,
        /\b\s*aggregate\s*$/i,

        /\b\s*sp\.?\s*cultivar\s*$/i,
        /\b\s*sp\.?\s*cv\.?\s*$/i,
        /\b\s*cultivars?\s*$/i,
        /\b\s*cv\s+$/i,
        /\b\s*cv$/i,

        /\b\s*cf\s*$/i,
        /\b\s*aff\s*$/i,
        /\b\s*s\.?n\.?\s*$/i,
        /\b\s*sp\.?\s*nov\.?\s*$/i,

        /\b\s*auct[.\s]*$/i,

        /\b\s*ined[.\s]*$/i,

        /\b\s*nom\.?\snud[.\s]*$/i,

        /\b\s*p\.p[.\s?]*$/i,

        /\b\s*spp?\.?[\s?]*$/i,
        /\b\s*species\s*$/i,
        /\b\s*spp?\.?\s*\(/i, // catch e.g. Ulmus sp. (excluding Ulmus glabra)
        /\b\s*species\s*\(/i,
    ];

    static taxonQualifierReplacement = [
        ' ', // (f x m or m x f) is the default so an explicit qualifier isn't used
        ' ', // (m x f or f x m) is the default so an explicit qualifier isn't used

        ' (f x m)',
        ' (m x f)',

        ' (f x m)',
        ' (m x f)',

        // stand-alone male/female qualifier (e.g. applied to Petasites hybridus)
        // removed single quotes
        ' male',
        ' female',

        // mid-string ss/sl qualifiers
        ' s.l. ',
        ' s.l. ',
        ' s.l. ',
        ' s.l. ',

        ' s.s. ',
        ' s.s. ',
        ' s.s. ',
        ' s.s. ',
        ' s.s. ',

        // end-of-string ss/sl qualifiers
        ' s.l.',
        ' s.l.',
        ' s.l.',
        ' s.l.',

        ' s.s.',
        ' s.s.',
        ' s.s.',
        ' s.s.',
        ' s.s.',

        ' agg.',
        ' agg.',

        ' cv. ',
        ' cv. ',
        ' cv. ',
        ' cv. ',
        ' cv. ',

        ' cf.',
        ' aff.',

        ' sp.nov.',
        ' sp.nov.',

        ' auct.',

        ' ined.',

        ' nom. nud.',

        ' pro parte',

        '',
        '',
        ' (',
        ' (',
    ];

    /**
     *
     * @param {string} taxonString
     * @returns {string}
     */
    static normaliseTaxonName(taxonString) {
        for (let i = 0, l = TaxonSearch.taxonRankNameSearchRegex.length; i < l; i++) {
            taxonString = taxonString.replace(TaxonSearch.taxonRankNameSearchRegex[i], TaxonSearch.taxonRankNameReplacement[i]);
        }

        for (let i = 0, l = TaxonSearch.taxonQualifierSearchRegex.length; i < l; i++) {
            taxonString = taxonString.replace(TaxonSearch.taxonQualifierSearchRegex[i], TaxonSearch.taxonQualifierReplacement[i]);
        }

        return taxonString;
    }


    /**
     * from https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
     *
     * @param {string} literal
     * @return string
     */
    static escapeRegExp(literal) {
        return literal.replace(TaxonSearch.cleanRegex, '\\$&');
    };

    static cleanRegex = /[.*+?^${}()|[\]\\]/g;

    /**
     * generate hybrid name permutations
     *
     * @param {string} names unescaped series of species e.g. "glandulifera" or "carex x nigra"
     * @returns {string} name permutations formatted as a regular expression
     */
    static generate_hybrid_combinations_regex(names) {
        const splitParts = TaxonSearch.escapeRegExp(names).split(/\s+x\s+/i);
        if (splitParts.length < 2) {
            return splitParts[0];
        }

        const hybridPermutations = [];

        /**
         * generate hybrid name permutations
         *
         * modified from O'Reilly PHP Cookbook
         * http://docstore.mik.ua/orelly/webprog/pcook/ch04_26.htm
         *
         * @param {Array.<string>} items
         * @param {Array.<string>} perms
         */
        const permutate = function (items, perms) {
            if (items.length === 0) {
                hybridPermutations[hybridPermutations.length] = perms.join('[a-zA-Z]* x ');
            } else {
                for (let i = items.length - 1; i >= 0; --i) {
                    const newItems = items.slice(0);
                    const newPerms = perms.slice(0); // take copies of the array

                    newPerms.unshift(newItems.splice(i, 1)[0]);
                    permutate(newItems, newPerms);
                }
            }
        };

        permutate(splitParts, []);

        return `(?:${hybridPermutations.join('|')})`;
    }

    /**
     *
     * @param {string} query
     * @returns {Array.<{entityId: string,
                        vernacular: string,
                        qname: string,
                        name: string,
                        qualifier: string,
                        authority: string,
                        uname: string,
                        vernacularMatched: boolean,
                        exact: boolean,
                        near: boolean,
                        formatted: string,
                        acceptedEntityId: string,
                        acceptedNameString: string,
                        acceptedQualifier: string,
                        acceptedAuthority: string
                        }>}
     */
    lookup(query) {
        // var timeStart = Date.now(); //track search time
        let results,
            testTaxon,
            taxonString = TaxonSearch.normaliseTaxonName(decodeURIComponent(query).trim()),
            canonical,
            matchedIds = {},
            id,
            preferHybrids = / x\b/.test(taxonString);

        // ignore trailing ' x' from string which would just muck up result matching
        taxonString = taxonString.replace(/\s+x$/i, '');

        if (taxonString !== '') {
            // TaxonSearch.abbreviatedGenusRegex = /^(X\s+)?([a-z])[\.\s]+(.*?)$/i;
            const abbreviatedMatches = taxonString.match(TaxonSearch.abbreviatedGenusRegex);
            if (abbreviatedMatches) {
                // matched an abbreviated genus name (or an abbreviated hybrid genus)

                let exp,
                    nearMatchExp;
                if (abbreviatedMatches[2] === 'X' || abbreviatedMatches[2] === 'x') {
                    // either have a genus name beginning 'X' or a hybrid genus

                    exp = new RegExp(`^(X\\s|X[a-z]+\\s+)(x )?\\b${TaxonSearch.generate_hybrid_combinations_regex(abbreviatedMatches[3])}.*`, 'i');
                    nearMatchExp = exp;
                } else {
                    exp = new RegExp(`^(X )?${TaxonSearch.escapeRegExp(abbreviatedMatches[2])}[a-z]+ (x )?.*\\b${TaxonSearch.generate_hybrid_combinations_regex(abbreviatedMatches[3])}.*`, 'i');

                    /**
                     * Similar to exp but without flexibility (.*) after genus part
                     * used only for result ranking (exact>near>vague)
                     */
                    nearMatchExp = new RegExp(`^(X )?${TaxonSearch.escapeRegExp(abbreviatedMatches[2])}[a-z]+ (x )?\\b${TaxonSearch.generate_hybrid_combinations_regex(abbreviatedMatches[3])}.*`, 'i');
                }

                for (id in Taxon.rawTaxa) {
                    testTaxon = Taxon.rawTaxa[id];

                    /**
                     * The canonical name may be identical to the nameString in which case JSON taxon list stores
                     * zero instead to save file space (and to mark that canonical name should be ignored)
                     */
                    canonical = testTaxon[TaxonSearch.canonicalColumn] === 0 ?
                        testTaxon[TaxonSearch.nameStringColumn]
                        :
                        testTaxon[TaxonSearch.canonicalColumn];

                    if (exp.test(canonical) ||
                        ((testTaxon[TaxonSearch.hybridCanonicalColumn] !== '') && exp.test(testTaxon[TaxonSearch.hybridCanonicalColumn]))
                    ) {
                        matchedIds[id] = {
                            exact: (testTaxon[TaxonSearch.nameStringColumn] === taxonString),
                            near: (nearMatchExp.test(testTaxon[TaxonSearch.nameStringColumn])),
                        };
                    }
                }

                results = this.compile_results(matchedIds, preferHybrids);
            } else {
                // genus is not abbreviated

                let canonicalQuery,
                    nearMatchRegex;
                const escapedTaxonString = TaxonSearch.escapeRegExp(taxonString);

                if (taxonString.indexOf(' ') !== -1) {
                    // hybrids of the form Species x nothoname or Species nothoname should be seen as equivalent

                    canonicalQuery = `${TaxonSearch.escapeRegExp(taxonString.substr(0, taxonString.indexOf(' ')))
                        } (x )?.*\\b${TaxonSearch.generate_hybrid_combinations_regex(taxonString.substr(taxonString.indexOf(' ') + 1))}.*`;

                    /**
                     * Similar to canonicalQuery/hybridCanonicalQuery but without flexibility (.*) after genus part
                     * used only for result ranking (exact>near>vague)
                     */
                    nearMatchRegex = new RegExp(`^(?:X\s+)?${TaxonSearch.escapeRegExp(taxonString.substr(0, taxonString.indexOf(' ')))
                        } (x )?\\b${TaxonSearch.generate_hybrid_combinations_regex(taxonString.substr(taxonString.indexOf(' ') + 1))}.*`, 'i');
                } else {
                    canonicalQuery = `${escapedTaxonString}.*`;
                    nearMatchRegex = new RegExp(`^${escapedTaxonString}.*`);
                }

                const strictEscapedTaxonString = `^${escapedTaxonString}.*`;
                // var escapedTaxonStringRegExp = new RegExp(strictEscapedTaxonString, 'i');
                // var canonicalQueryRegExp = new RegExp('^' + canonicalQuery, 'i');
                // var hybridCanonicalQueryregExp = new RegExp('^X ' + canonicalQuery, 'i');
                const canonicalQueryRegExp = new RegExp(`^(?:X\s+)?${canonicalQuery}`, 'i');

                if (!TaxonSearch.showVernacular) {
                    // no vernacular

                    for (id in Taxon.rawTaxa) {
                        testTaxon = Taxon.rawTaxa[id];

                        canonical = testTaxon[TaxonSearch.canonicalColumn] === 0 ?
                            testTaxon[TaxonSearch.nameStringColumn]
                            :
                            testTaxon[TaxonSearch.canonicalColumn];

                        if (
                            // testTaxon[TaxonSearch.nameStringColumn].search(escapedTaxonStringRegExp) !== -1 ||
                            canonicalQueryRegExp.test(testTaxon[TaxonSearch.nameStringColumn]) ||
                            ((canonical !== testTaxon[TaxonSearch.nameStringColumn]) && canonicalQueryRegExp.test(canonical))
                        // testTaxon[TaxonSearch.nameStringColumn].search(hybridCanonicalQueryregExp) !== -1
                        ) {
                            matchedIds[id] =
                                {exact: (testTaxon[TaxonSearch.nameStringColumn] == taxonString)};
                        }
                    }

                    results = this.compile_results(matchedIds, preferHybrids);
                } else {
                    const caseInsensitiveEscapedTaxonRegex = new RegExp(strictEscapedTaxonString, 'i');

                    for (id in Taxon.rawTaxa) {
                        testTaxon = Taxon.rawTaxa[id];

                        canonical = testTaxon[TaxonSearch.canonicalColumn] === 0 ?
                            testTaxon[TaxonSearch.nameStringColumn]
                            :
                            testTaxon[TaxonSearch.canonicalColumn];

                        if (
                            // testTaxon[TaxonSearch.nameStringColumn].search(escapedTaxonStringRegExp) !== -1 ||
                            canonicalQueryRegExp.test(testTaxon[TaxonSearch.nameStringColumn]) ||
                            ((canonical !== testTaxon[TaxonSearch.nameStringColumn]) && canonicalQueryRegExp.test(canonical))
                        // testTaxon[TaxonSearch.nameStringColumn].search(hybridCanonicalQueryregExp) !== -1
                        ) {
                            matchedIds[id] = {
                                exact: (testTaxon[TaxonSearch.nameStringColumn] == taxonString),
                                near: (nearMatchRegex.test(testTaxon[TaxonSearch.nameStringColumn]) ||
                                    nearMatchRegex.test(canonical)),
                            };
                        } else if (
                            caseInsensitiveEscapedTaxonRegex.test(testTaxon[TaxonSearch.vernacularColumn]) ||
                            caseInsensitiveEscapedTaxonRegex.test(testTaxon[TaxonSearch.vernacularRootColumn])
                        ) {
                            matchedIds[id] = {
                                exact: (testTaxon[TaxonSearch.nameStringColumn] == taxonString),
                                vernacular: true,
                            };
                        }
                    }

                    results = this.compile_results(matchedIds, preferHybrids);

                    /**
                     * if very few matches then retry searching using much fuzzier matching
                     */
                    if (results.length < 5) {
                        const broadRegExp = new RegExp(`\\b${escapedTaxonString}.*`, 'i'); // match anywhere in string

                        for (id in Taxon.rawTaxa) {
                            if (!matchedIds.hasOwnProperty(id)) {
                                testTaxon = Taxon.rawTaxa[id];

                                if (broadRegExp.test(testTaxon[TaxonSearch.nameStringColumn])) {
                                    matchedIds[id] =
                                        {exact: (testTaxon[TaxonSearch.nameStringColumn] === taxonString)};
                                } else if (
                                    (testTaxon[TaxonSearch.canonicalColumn] !== 0 && broadRegExp.test(testTaxon[TaxonSearch.canonicalColumn])) ||
                                    broadRegExp.test(testTaxon[TaxonSearch.vernacularColumn])
                                ) {
                                    matchedIds[id] = {
                                        exact: (testTaxon[TaxonSearch.nameStringColumn] === taxonString),
                                        vernacular: true
                                    };
                                }
                            }
                        }

                        results = this.compile_results(matchedIds, preferHybrids);
                    }
                }
            }
        } else {
            results = [];
        }

        return results;
    }

    compile_results(matchedIds, preferHybrids) {
        const results = [];

        for (const id in matchedIds) {
            if (matchedIds.hasOwnProperty(id)) {
                const taxon = Taxon.rawTaxa[id];

                if (
                    (!this.requireExtantDDbRecords || (this.requireExtantDDbRecords && taxon[TaxonSearch.usedColumn] === 1)) &&
                    (!this.minimumRankSort || (this.minimumRankSort > 0 && taxon[TaxonSearch.minRankColumn] >= this.minimumRankSort))
                ) {
                    const qname = taxon[TaxonSearch.nameStringColumn] + (taxon[TaxonSearch.qualifierColumn] ? (` ${taxon[TaxonSearch.qualifierColumn]}`) : '');

                    const row = {
                        entityId: id,
                        vernacular: taxon[TaxonSearch.vernacularColumn],
                        qname,
                        name: qname, // use qualified name for the generic name field
                        qualifier: taxon[TaxonSearch.qualifierColumn],
                        authority: taxon[TaxonSearch.authorityColumn],
                        uname: taxon[TaxonSearch.nameStringColumn],
                        vernacularMatched: matchedIds[id].hasOwnProperty('vernacular'),
                        exact: matchedIds[id].hasOwnProperty('exact') && matchedIds[id].exact,
                        near: matchedIds[id].hasOwnProperty('near') && matchedIds[id].near,
                    };

                    row.formatted = TaxonSearch.formatter(row);

                    if (taxon[TaxonSearch.acceptedEntityIdColumn]) {
                        const acceptedTaxon = Taxon.rawTaxa[taxon[TaxonSearch.acceptedEntityIdColumn]];

                        if (!acceptedTaxon) {
                            if (!Taxon.rawTaxa) {
                                throw new Error(`Taxon.rawTaxa set is undefined, when trying to find taxon for accepted entity id ${taxon[TaxonSearch.acceptedEntityIdColumn]}`);
                            } else {
                                throw new Error(`Failed to find taxon for accepted entity id ${taxon[TaxonSearch.acceptedEntityIdColumn]}`);
                            }
                        }

                        row.acceptedEntityId = taxon[TaxonSearch.acceptedEntityIdColumn];
                        row.acceptedNameString = acceptedTaxon[TaxonSearch.nameStringColumn];
                        row.acceptedQualifier = acceptedTaxon[TaxonSearch.qualifierColumn];
                        row.acceptedAuthority = acceptedTaxon[TaxonSearch.authorityColumn];
                    }

                    results.push(row);
                }
            }
        }

        if (results.length) {
            results.sort((a, b) => {
                // if (a.uname == 'Taraxacum \'Irish cambricum\'' || b.uname == 'Taraxacum \'Irish cambricum\'') {
                //   console.log(a.uname + " with " + b.uname);
                // }

                if (a.exact) {
                    // logger('exact test a: ' + a.uname + ' vs ' + b.uname);
                    // logger(b);
                    if (b.exact) {
                        return a.acceptedEntityId ? 1 : 0; // prefer accepted name
                    }
                    return -1;

                    // return b.exact ? 0 : -1;
                } else if (b.exact) {
                    // logger('exact test b: ' + b.uname);
                    return 1;
                }

                if (a.near) {
                    if (!b.near) {
                        return -1;
                    }
                } else if (b.near) {
                    // logger('exact test b: ' + b.uname);
                    return 1;
                }

                let aIsHybrid = a.uname.match(/\bx\b/i) !== null;
                let bIsHybrid = b.uname.match(/\bx\b/i) !== null;

                if (aIsHybrid) {
                    // logger('hybrid test: ' + a.qname + ' vs ' + b.qname);
                    // logger('hybrid test: ' + a.uname + ' vs ' + b.uname);
                    if (bIsHybrid) {
                        if (a.uname === b.uname) {
                            return a.acceptedEntityId ? 1 : 0; // prefer accepted name
                        }
                        return a.qname < b.qname ? -1 : 1;
                    }
                    return preferHybrids ? -1 : 1;
                } else if (bIsHybrid) {
                    return preferHybrids ? 1 : -1;
                } else if (a.uname === b.uname) {
                    if ((a.acceptedEntityId || b.acceptedEntityId) &&
                        !(a.acceptedEntityId && b.acceptedEntityId)) {
                        // one of the pair is not an accepted name

                        return a.acceptedEntityId ? 1 : -1; // prefer accepted name
                    } else {
                        // for NYPH purposes agg. and s.l. should be prioritised over
                        // agg., s.l., empty, s.s.

                        let aQIndex = ['s.s.', '', null, 's.l.', 'agg.'].indexOf(a.qualifier);
                        let bQIndex = ['s.s.', '', null, 's.l.', 'agg.'].indexOf(b.qualifier);

                        return (aQIndex === bQIndex) ? 0 : (
                            (aQIndex < bQIndex) ? 1 : -1
                        );
                    }
                }
                return a.uname < b.uname ? -1 : 1;
            });

            // truncate results
            if (results.length > TaxonSearch.MAXIMUM_RESULTS) {
                results.length = TaxonSearch.MAXIMUM_RESULTS;
            }
        }

        return results;
    }
}

