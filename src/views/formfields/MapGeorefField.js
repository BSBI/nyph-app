//import {GridCoords} from "british-isles-gridrefs";
import {escapeHTML, FormField, TextGeorefField} from "bsbi-app-framework";
import {uuid} from "bsbi-app-framework/src/models/Model";
import mapboxgl from 'mapbox-gl';
import {GridRef, LatLngWGS84} from "british-isles-gridrefs";
import {MapMarker} from "../MapMarker";
//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export class MapGeorefField extends TextGeorefField {

    // /**
    //  * @type {string}
    //  */
    // _inputId;

    /**
     * @type {string}
     */
    #containerId;

    /**
     *
     * @type {string}
     * @private
     */
    _value = '';

    /**
     *
     * @type {string}
     * @private
     */
    _inputType = 'text';

    /**
     *
     * @type {string}
     * @private
     */
    _autocomplete = '';

    /**
     *
     * @type {boolean}
     */
    includeSearchBox = false;

    /**
     * @type {mapboxgl.Map}
     */
    map;

    /**
     * @type {MapMarker}
     * @private
     */
    _squareMarker;

    /**
     *
     * @param {{[label] : string, [helpText]: string, [options]: {}, [placeholder]: string, [type]: string, [autocomplete]: string, [baseSquareResolution]: ?number, [includeSearchBox]: boolean}} [params]
     */
    constructor (params) {
        super(params);

        if (params) {
            if (params.includeSearchBox) {
                this.includeSearchBox = params.includeSearchBox;
            }
        }
    }

    /**
     *
     * @param {(string|null|undefined)} textContent
     */
    set value(textContent) {
        this._value = (undefined === textContent || null == textContent) ? '' : textContent.trim();
        this.updateView();
    }

    /**
     *
     * @returns {string}
     */
    get value() {
        return this._value;
    }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            const inputEl = document.getElementById(this._inputId);
            inputEl.value = FormField.cleanRawString(this._value);

            this.tryValue(inputEl.value);
        }
    }

    /**
     * initialises this._fieldEl
     *
     * @returns {void}
     */
    buildField() {
        // <div class="form-group">
        //     <label for="{baseId}gridref">Postcode or grid-reference</label>
        //     <input type="text" class="form-control" id="{baseId}gridref" aria-describedby="{baseId}grHelp" placeholder="Grid-reference or postcode">
        //     <small id="{baseId}grHelp" class="form-text text-muted">We need to be able to put your survey on our map. Detailed locations won't be made public.</small>
        // </div>

        // <div class="form-group">
        //     <label for="{baseId}gridref">Postcode or grid-reference</label>
        //     <div class="input-group">
        //         <input id="{baseId}gridref" aria-describedby="{baseId}grHelp" type="text" class="form-control" placeholder="Grid-reference or postcode" autocomplete="postal-code" required>
        //         <span class="input-group-btn">
        //             <button id="gps" type="button" class="btn btn-outline-secondary btn-sm" title="use GPS">
        //                 <span class="material-icons">gps_not_fixed</span>
        //             </button>
        //         </span>
        //     </div>
        //     <small id="{baseId}grHelp" class="form-text text-muted">We need to be able to put your survey on our map. Detailed locations won't be made public.</small>
        // </div>

        const container = document.createElement('div');
        container.className = 'form-group';
        this.#containerId = container.id = FormField.nextId;

        this._inputId = FormField.nextId;

        const labelEl = container.appendChild(document.createElement('label'));
        labelEl.htmlFor = this._inputId;
        labelEl.textContent = this.label;

        const inputGroupEl = container.appendChild(document.createElement('div'));
        inputGroupEl.className = 'input-group';

        const inputField = inputGroupEl.appendChild(document.createElement('input'));
        inputField.className = "form-control";
        inputField.id = this._inputId;
        inputField.type = 'text';

        if (this.placeholder) {
            inputField.placeholder = this.placeholder;
        }

        if (this._autocomplete) {
            inputField.autocomplete = this._autocomplete;

            if ('off' === this._autocomplete) {
                // browsers tend to ignore autocomplete off, so also assign a random 'name' value
                inputField.name = uuid();
            }
        }

        const buttonContainerEl = inputGroupEl.appendChild(document.createElement('span'));
        buttonContainerEl.className = 'input-group-btn';

        if (navigator.geolocation) {
            const gpsButton = buttonContainerEl.appendChild(document.createElement('button'));
            gpsButton.id = FormField.nextId;
            gpsButton.type = 'button';
            gpsButton.className = 'btn btn-outline-secondary btn-sm';
            gpsButton.title = 'use GPS';

            const buttonIconEl = gpsButton.appendChild(document.createElement('span'));
            buttonIconEl.className = 'material-icons';
            buttonIconEl.innerText = 'gps_not_fixed';

            gpsButton.addEventListener('click', this.gpsButtonClickHandler.bind(this));
        }

        if (this.completion === FormField.COMPLETION_COMPULSORY) {
            inputField.required = true;
        }

        if (this.validationMessage) {
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        this.addMapBox(container);

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        inputField.addEventListener('change', this.inputChangeHandler.bind(this));

        this._fieldEl = container;
    }

    /**
     *
     * @param {HTMLElement} container
     */
    addMapBox(container) {
        let divEl = container.appendChild(document.createElement('div'));
        divEl.id = `map${FormField.nextId}`;
        divEl.className = 'map-container';

        // see https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
        mapboxgl.accessToken = 'pk.eyJ1IjoiamFwb25pY3VzIiwiYSI6ImNramV1dnRpeTJvNzczMG10c2s3NnZ2bHMifQ.C8BsQepXT6KE-hoQaEerRw';

        this.map = new mapboxgl.Map({
            container: divEl,
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        if (this.includeSearchBox) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,

            });

            geocoder.on('result', (result) => {
                console.log({'geocode result' : result});
                this.#setGridrefFromGeocodedResult(result.result);
            });

            this.map.addControl(geocoder);
        }

        this.respondToVisibility(divEl, (visible) => {
            if (visible) {
                console.log('Map is visible');
                this.map.resize()
            }
        });
    }

    /**
     * Start observing visibility of element. On change, the
     * the callback is called with Boolean visibility as argument.
     * see https://stackoverflow.com/a/44670818
     *
     * @param element
     * @param callback
     */
    respondToVisibility(element, callback) {
        let options = {
            root: document.documentElement,
        };

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                callback(entry.intersectionRatio > 0);
            });
        }, options);

        observer.observe(element);
    }

    /**
     *
     * @param {{bbox : Array<number>, center : Array<number>, geometry : {coordinates:Array<number>, type:string}, type:string, place_type:Array<string>}} result
     */
    #setGridrefFromGeocodedResult(result) {
        // currently just use the centre-point
        this.processLatLngPosition(result.center[1], result.center[0], this.baseSquareResolution || 1);

        // place_type is one or more of country, region, postcode, district, place, locality, neighborhood, address, and poi
    }

    // /**
    //  *
    //  * @param {(boolean|null)} isValid
    //  */
    // markValidity(isValid) {
    //     const el = document.getElementById(this.#inputId);
    //
    //     if (null === isValid) {
    //         el.classList.remove('is-invalid', 'is-valid');
    //     } else {
    //         el.classList.remove(isValid ? 'is-invalid' : 'is-valid');
    //         el.classList.add(isValid ? 'is-valid' : 'is-invalid');
    //     }
    // }

    inputChangeHandler (event) {
        event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)

        //console.log('got input field change event');

        this.value = FormField.cleanRawString(document.getElementById(this._inputId).value);

        // if (this.value) {
        //     let result = this.tryValue(this.value);
        // }

        this.fireEvent(FormField.EVENT_CHANGE);
    }

    /**
     *
     * @param {number} length (should already have been normalised)
     * @returns {number} zoom level
     */
    zoomMapping(length) {
        return {
            1: 12,
            10: 12,
            100: 11,
            1000: 10,
            2000: 8,
            10000: 7,
        }[length];
    }

    /**
     *
     * @param {string} query may be a grid-reference or postcode
     */
    tryValue(query) {
        let gridRefParser = GridRef.from_string(query);

        if (query && gridRefParser) {
            const latLngSW = gridRefParser.gridCoords.to_latLng();
            const latLngNW = (new gridRefParser.GridCoords(gridRefParser.gridCoords.x, gridRefParser.gridCoords.y + gridRefParser.length)).to_latLng();
            const latLngNE = (new gridRefParser.GridCoords(gridRefParser.gridCoords.x + gridRefParser.length, gridRefParser.gridCoords.y + gridRefParser.length)).to_latLng();
            const latLngSE = (new gridRefParser.GridCoords(gridRefParser.gridCoords.x + gridRefParser.length, gridRefParser.gridCoords.y)).to_latLng();

            const latCentre = (latLngSW.lat + latLngNW.lat + latLngSE.lat + latLngNE.lat) / 4;
            const lngCentre = (latLngSW.lng + latLngNW.lng + latLngSE.lng + latLngNE.lng) / 4;

            // this.processLatLngPosition(
            //     latCentre,
            //     lngCentre,
            //     gridRefParser.length
            // );

            this.map.jumpTo({
                center: [lngCentre, latCentre],
                zoom: this.zoomMapping(gridRefParser.length),
            });

            // const marker = new MapMarker({
            //     name : gridRefParser.preciseGridRef,
            //     type : MapMarker.TYPE_POLYGON,
            //     coordinates : [[
            //         [latLngSW.lng, latLngSW.lat],
            //         [latLngNW.lng, latLngNW.lat],
            //         [latLngNE.lng, latLngNE.lat],
            //         [latLngSE.lng, latLngSE.lat]
            //     ]],
            //     fillColour: '#008800',
            //     fillOpacity: 0.5,
            //     lineColour: '#00aa00',
            // });
            //
            // marker.addToMap(this.map);

            this.setSquareMarker(latLngSW, latLngNW, latLngNE, latLngSE, gridRefParser.preciseGridRef);

        } else {
            this.hideSquareMarker();

            // try to decipher postcode or place-name using remote geo-coder

        }
    }

    /**
     *
     */
    hideSquareMarker() {
        if (this._squareMarker && this._squareMarker.visible) {
            this._squareMarker.removeFromMap(this.map);
        }
    }

    /**
     *
     * @param {LatLngWGS84} sw
     * @param {LatLngWGS84} nw
     * @param {LatLngWGS84} ne
     * @param {LatLngWGS84} se
     * @param {string=} name
     */
    setSquareMarker(sw, nw, ne, se,name = '') {
        if (this._squareMarker) {
            // marker has already been defined, so only need to update its position data and redisplay

            this._squareMarker.updateCoordinates(
                this.map,
                [[
                    [sw.lng, sw.lat],
                    [nw.lng, nw.lat],
                    [ne.lng, ne.lat],
                    [se.lng, se.lat]
                ]],
                name
            );
        } else {
            this._squareMarker = new MapMarker({
                name : name,
                type : MapMarker.TYPE_POLYGON,
                coordinates : [[
                    [sw.lng, sw.lat],
                    [nw.lng, nw.lat],
                    [ne.lng, ne.lat],
                    [se.lng, se.lat]
                ]],
                fillColour: '#008800',
                fillOpacity: 0.5,
                lineColour: '#00aa00',
            });

            this._squareMarker.addToMap(this.map);
        }
    }

    /**
     * by the time summariseImpl has been called have already checked that summary is wanted
     *
     * @param {string} key
     * @param {{field : TextGeorefField, attributes : {options : Object.<string, {label : string}>}, summary : {summaryPrefix: string}}} property properties of the form descriptor
     * @param {Object.<string, {}>} attributes attributes of the model object
     * @return {string}
     */
    static summariseImpl(key, property, attributes) {
        return (attributes[key] !== '' && attributes[key] !== null && attributes[key] !== undefined) ?
            escapeHTML(attributes[key].trim())
            : '';
    }
}
