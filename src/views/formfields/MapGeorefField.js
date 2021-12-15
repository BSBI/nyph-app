//import {GridCoords} from "british-isles-gridrefs";
import {escapeHTML, Form, FormField, GPSRequest, TextGeorefField, Survey, GridRef, LatLngWGS84} from "bsbi-app-framework";
import {uuid} from "bsbi-app-framework/src/models/Model";
import mapboxgl from 'mapbox-gl';
//import {GridRef, LatLngWGS84} from "british-isles-gridrefs";
import {MapMarker} from "../MapMarker";
//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export class MapGeorefField extends TextGeorefField {

    /**
     * @type {string}
     */
    #containerId;

    // /**
    //  *
    //  * @type {string}
    //  * @private
    //  */
    // _inputType = 'text';

    // /**
    //  *
    //  * @type {string}
    //  * @private
    //  */
    // _autocomplete = '';

    /**
     *
     * @type {boolean}
     */
    includeSearchBox = false;

    /**
     *
     * @type {number}
     */
    defaultLat = 55.15793;

    /**
     *
     * @type {number}
     */
    defaultLng = -4.68;

    /**
     *
     * @type {number}
     */
    defaultZoom = 5;

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
     * set if map has a well-defined zoom and centre
     * (i.e. has been initialised from a typed grid-ref, a manual re-centre or user-click)
     *
     * @type {boolean}
     */
    mapPositionIsCurrent = false;

    static GPS_INITIALISATION_MODE_ALWAYS = 'always'; // for fresh form always start GPS lookup on ay type of device
    static GPS_INITIALISATION_MODE_PERMITTED = 'permitted'; // for fresh form start GPS lookup automatically if already permitted
    static GPS_INITIALISATION_MODE_MOBILE_ALWAYS = 'mobilealways'; // for fresh form start GPS lookup if on mobile device
    static GPS_INITIALISATION_MODE_MOBILE_PERMITTED = 'mobilepermitted'; // for fresh form start GPS lookup if on mobile device and GPS already allowed
    static GPS_INITIALISATION_MODE_NEVER = 'never'; // don't automatically attempt GPS lookup

    gpsInitialisationMode = MapGeorefField.GPS_INITIALISATION_MODE_MOBILE_PERMITTED;

    geocoderOnMap = false;

    useSeparateInputField = true;

    /**
     *
     * @param {{
     * [label] : string,
     * [helpText]: string,
     * [options]: {},
     * [placeholder]: string,
     * [type]: string,
     * [autocomplete]: string,
     * [baseSquareResolution]: ?number,
     * [includeSearchBox]: boolean,
     * [gpsInitialisationMode]: string
     * }} [params]
     */
    constructor (params) {
        super(params)

        if (params) {
            if (params.includeSearchBox) {
                this.includeSearchBox = params.includeSearchBox;
            }

            if (params.gpsInitialisationMode) {
                this.gpsInitialisationMode = params.gpsInitialisationMode;
            }
        }
    }

    // /**
    //  *
    //  * @param {(string|null|undefined)} textContent
    //  */
    // set value(textContent) {
    //     this._value = (undefined === textContent || null == textContent) ? '' : textContent.trim();
    //     this.updateView();
    // }

    // /**
    //  *
    //  * @returns {string}
    //  */
    // get value() {
    //     return this._value;
    // }

    updateView() {
        if (this._fieldEl) {
            // do nothing until the view has been constructed

            const inputEl = document.getElementById(this._inputId);
            inputEl.value = FormField.cleanRawString(this._value.gridRef);

            // always need to call tryValue as this sets or clears the map marker
            this.tryValue(this._value.gridRef);

            // if (this._value.gridRef && this._value.source === TextGeorefField.GEOREF_SOURCE_GRIDREF) {
            //     // only recenter the map if the source was a typed grid-reference
            //     // (refs from other sources should already have moved the map)
            //
            //     this.tryValue(inputEl.value);
            // } else {
            //     console.log({'not re-centering map for new value' : this._value});
            // }
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

        if (this.useSeparateInputField) {
            const inputField = inputGroupEl.appendChild(document.createElement('input'));
            inputField.className = "form-control";
            inputField.id = this._inputId;
            inputField.type = 'text';

            if (this.placeholder) {
                inputField.placeholder = this.placeholder;
            }

            if (this._autocomplete) {
                inputField.autocomplete = this._autocomplete;

                if ('off' === this._autocomplete || '' === this._autocomplete) {
                    // browsers tend to ignore autocomplete off, so also assign a random 'name' value
                    inputField.name = uuid();
                }
            }

            inputField.addEventListener('change', this.inputChangeHandler.bind(this));

            if (this.completion === FormField.COMPLETION_COMPULSORY) {
                inputField.required = true;
            }
        }

        if (this.validationMessage) {
            const validationMessageElement = container.appendChild(document.createElement('div'));
            validationMessageElement.className = 'invalid-feedback';
            validationMessageElement.innerHTML = this.validationMessage;
        }

        this.addMapBox(container);

        if (this.includeSearchBox) {
            // noinspection JSUnresolvedFunction
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                bbox: [-11, 49.1, 2, 61] // [minX, minY, maxX, maxY] {lat: 49.1, lng: -11}, {lat: 61, lng: 2}
            });

            geocoder.on('result', (result) => {
                console.log({'geocode result' : result});
                this.#setGridrefFromGeocodedResult(result.result);
            });

            if (this.geocoderOnMap) {
                this.map.addControl(geocoder, 'top-right');
            } else {
                // put the geocoder outside the map area

                inputGroupEl.appendChild(geocoder.onAdd(this.map));

                //geocoder.addTo(inputGroupEl);
            }
        }

        if (navigator.geolocation) {
            const buttonContainerEl = inputGroupEl.appendChild(document.createElement('span'));
            buttonContainerEl.className = 'input-group-btn';

            const gpsButton = buttonContainerEl.appendChild(document.createElement('button'));
            gpsButton.id = FormField.nextId;
            gpsButton.type = 'button';
            gpsButton.className = 'btn btn-outline-secondary btn-sm';
            gpsButton.title = 'use GPS';

            if (this.gpsTextLabel) {
                const gpsTextLabel = gpsButton.appendChild(document.createElement('span'));
                gpsTextLabel.style.verticalAlign = 'middle';
                gpsTextLabel.innerText = 'GPS ';
            }

            const buttonIconEl = gpsButton.appendChild(document.createElement('span'));
            buttonIconEl.className = 'material-icons';
            buttonIconEl.innerText = 'gps_not_fixed';

            if (this.gpsTextLabel) {
                buttonIconEl.style.verticalAlign = 'middle';
            }

            gpsButton.addEventListener('click', this.gpsButtonClickHandler.bind(this));
        }

        const offlineWarning = container.appendChild(document.createElement('small'));
        offlineWarning.classList.add('offline-warning');
        offlineWarning.innerHTML = 'The map box might not display properly because you may not have a network connection currently. You can still use GPS or type in a grid-reference to locate records.';

        if (this.helpText) {
            const helpTextField = container.appendChild(document.createElement('small'));
            helpTextField.innerHTML = this.helpText;
        }

        this._fieldEl = container;
    }

    /**
     *
     * @param {HTMLElement} contentContainer
     */
    addField (contentContainer) {
        // const formEl = this.parentForm.formElement;
        //
        // formEl.appendChild(this.fieldElement);

        super.addField(contentContainer);
        this.parentForm.addListener(Form.EVENT_INITIALISE_NEW, async (/** @type {{[survey] : Survey}} */ params) => {
            console.log('Handling initialisation of new MapGeoRefField.');

            if (this._value.gridRef) {
                console.log({'In georef form initialisation already have a value set, so aborting.' : this._value});
                return;
            }

            let doGPSInitialisation;

            if (navigator.geolocation && this.gpsInitialisationMode !== MapGeorefField.GPS_INITIALISATION_MODE_NEVER) {
                if (this.gpsInitialisationMode === MapGeorefField.GPS_INITIALISATION_MODE_MOBILE_ALWAYS ||
                    this.gpsInitialisationMode === MapGeorefField.GPS_INITIALISATION_MODE_MOBILE_PERMITTED) {

                    doGPSInitialisation = ((GPSRequest.getDeviceType() === GPSRequest.DEVICE_TYPE_MOBILE) &&
                        (this.gpsInitialisationMode === MapGeorefField.GPS_INITIALISATION_MODE_MOBILE_ALWAYS ||
                            await GPSRequest.haveGPSPermission() === GPSRequest.GPS_PERMISSION_GRANTED));

                } else {
                    // either 'always' or 'always-if-permitted'

                    doGPSInitialisation = (this.gpsInitialisationMode === MapGeorefField.GPS_INITIALISATION_MODE_ALWAYS ||
                        await GPSRequest.haveGPSPermission() === GPSRequest.GPS_PERMISSION_GRANTED);
                }

            } else {
                doGPSInitialisation = false;
            }

            // let grantState = GPSRequest.haveGPSPermission();
            //
            // console.log({'grant state':grantState});

            if (doGPSInitialisation) {
                this.seekGPS().then(() => {
                    console.log('GPS initialisation succeeded.');

                    this._tryDefaultGeoreferenceFromSurvey(params.survey, false); // don't move the map, but do set a placeholder value
                },
                    (error) => {
                        console.log({'GPS initialisation failed': error});
                        this._tryDefaultGeoreferenceFromSurvey(params.survey, true);
                    });
            } else {
                this._tryDefaultGeoreferenceFromSurvey(params.survey, true);
            }
        });

        this.parentForm.addListener(Form.EVENT_INITIALISED, (/** @type {{[survey] : Survey}} */ params) => {
            console.log('Handling re-initialisation of new MapGeoRefField.');

            // set the geo-ref field placeholder to match the survey grid-ref and center the map there if no grid-ref has been specified

            this._tryDefaultGeoreferenceFromSurvey(params.survey, !this._value.gridRef);
        });
    }

    /**
     *
     * @param {Survey} survey
     * @param {boolean} setMap
     * @private
     */
    _tryDefaultGeoreferenceFromSurvey(survey, setMap) {
        if (this.initialiseFromDefaultSurveyGeoref) {
            let geoRef = survey.geoReference;

            console.log({"Default occurrence georef" : geoRef});

            if (geoRef && geoRef.gridRef) {
                if (setMap) {
                    this.mapPositionIsCurrent = false; // force re-centre & zoom
                    this.tryValue(geoRef.gridRef);
                }

                const inputEl = document.getElementById(this._inputId);
                if (inputEl) {
                    inputEl.placeholder = geoRef.gridRef;
                }
            }

            survey.addListener(Survey.EVENT_MODIFIED, () => {
                const newGeoRef = survey.geoReference;

                if (newGeoRef && newGeoRef.gridRef) {
                    const inputEl = document.getElementById(this._inputId);
                    if (inputEl) {
                        inputEl.placeholder = geoRef.gridRef;
                    }
                }
            });
        }
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
            center: [this.defaultLng, this.defaultLat], // starting position [lng, lat]
            zoom: this.defaultZoom, // starting zoom
            cooperativeGestures: true // see https://github.com/mapbox/mapbox-gl-js/issues/6884
        });

        this.map.on('click', /** @param {mapboxgl.MapMouseEvent} mapMouseEvent */ (mapMouseEvent) => {
            console.log(`A click event has occurred at ${mapMouseEvent.lngLat}`);
            console.log({mapMouseEvent});

            let zoom = this.map.getZoom();
            const squareDimension = this.reverseZoomMapping(zoom);

            if (squareDimension <= this.minResolution) {
                // only allow selection if zoomed-in sufficiently

                this.map.jumpTo({
                    center: [mapMouseEvent.lngLat.lng, mapMouseEvent.lngLat.lat],
                    zoom: zoom
                }, null);

                this.mapPositionIsCurrent = true;

                this.processLatLngPosition(
                    mapMouseEvent.lngLat.lat,
                    mapMouseEvent.lngLat.lng,
                    squareDimension,
                    TextGeorefField.GEOREF_SOURCE_MAP
                );
            }
        });

        this.respondToVisibility(divEl, (visible) => {
            if (visible) {
                console.log('Map is visible');
                this.map.resize(null);
            }
        });
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
            2000: 10,
            10000: 8,
        }[length];
    }

    /**
     *
     * @param {number} zoom
     * @returns {number} grid square dimension (m)
     */
    reverseZoomMapping(zoom) {
        return {
            0: 100000,
            1: 100000,
            2: 100000,
            3: 100000,
            4: 100000,
            5: 100000,
            6: 100000,
            7: 10000,
            8: 10000,
            9: 2000,
            10: 2000,
            11: 1000,
            12: 1000,
            13: 100,
            14: 100,
            15: 10,
        }[Math.round(zoom)];
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
        console.log({'geocoded result' : result});

        this.mapPositionIsCurrent = false;

        // currently, just uses the centre-point
        this.processLatLngPosition(
            result.center[1],
            result.center[0],
            this.baseSquareResolution || 1,
            TextGeorefField.GEOREF_SOURCE_PLACE
        );

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

    // inputChangeHandler (event) {
    //     event.stopPropagation(); // don't allow the change event to reach the form-level event handler (will handle it here instead)
    //
    //     //console.log('got input field change event');
    //
    //     this.value = FormField.cleanRawString(document.getElementById(this._inputId).value);
    //
    //     // if (this.value) {
    //     //     let result = this.tryValue(this.value);
    //     // }
    //
    //     this.fireEvent(FormField.EVENT_CHANGE);
    // }

    /**
     * this pans and zooms the map, but does not update the field value or displayed grid-reference
     *
     * @param {string} query may be a grid-reference or postcode
     */
    tryValue(query) {

        if (query) {
            let gridRefParser = GridRef.from_string(query);

            if (gridRefParser) {
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

                if (!this.mapPositionIsCurrent) {
                    this.map.jumpTo({
                        center: [lngCentre, latCentre],
                        zoom: this.zoomMapping(gridRefParser.length),
                    }, null);

                    this.mapPositionIsCurrent = true;
                }

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
        } else {
            this.hideSquareMarker();
        }
    }

    /**
     *
     */
    hideSquareMarker() {
        if (this._squareMarker && this._squareMarker.visible) {
            this._squareMarker.removeFromMap(this.map);
            this._squareMarker = null;
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
