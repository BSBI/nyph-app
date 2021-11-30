export class MapMarker {
    /**
     * @type {string}
     */
    markerId;

    /**
     * @type {{name : string,
     * type : string,
     * [coordinates] : Array,
     * [fillColour] : string,
     * [fillOpacity] : number,
     * [lineColour] : string,
     * [lineOpacity] : number,
     * [lineWidth] : number,
     * [lineDashArray] : Array<number>
     * }} definition
     */
    definition;

    visible = false;

    static TYPE_POLYGON = 'polygon';
    static TYPE_POINT = 'point';

    /**
     *
     * @type {number}
     * @private
     */
    static _markerSerial = 0;

    /**
     *
     * @param {{name : string,
     * type : string,
     * [coordinates] : Array,
     * [fillColour] : string,
     * [fillOpacity] : number,
     * [lineColour] : string,
     * [lineOpacity] : number,
     * [lineWidth] : number,
     * [lineDashArray] : Array<number>
     * }} [definition]
     */
    constructor(definition) {
        this.markerId = `marker${MapMarker._markerSerial++}`;

        if (definition) {
            this.setDefinition(definition);
        }
    }

    /**
     *
     * @param {{name : string,
     * type : string,
     * [coordinates] : Array,
     * [fillColour] : string,
     * [fillOpacity] : number,
     * [lineColour] : string,
     * [lineOpacity] : number,
     * [lineWidth] : number,
     * [lineDashArray] : Array<number>
     * }} definition
     */
    setDefinition(definition) {
        this.definition = definition;
    }

    /**
     *
     * @param {mapboxgl.Map} map
     */
    addToMap(map) {
        switch (this.definition.type) {
            case MapMarker.TYPE_POLYGON:
                this.#addPolygon(map);
                break;

            case MapMarker.TYPE_POINT:
                break;

            default:
                throw new Error(`Unrecognised marker type '{this.definition.type}'.`);
        }
    }

    /**
     *
     * @param {mapboxgl.Map} map
     */
    #addPolygon(map) {
        // mapbox life-cycle is broken can't add source until map has finished loading
        if (map.isStyleLoaded()) {
            this._addPolygonImpl(map);
        } else {
            setTimeout(() => {
                this.#addPolygon(map);
            }, 1000);
        }
    }

    _addPolygonImpl(map) {
        // e.g. see https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
        map.addSource(this.markerId, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                "properties": {"name": this.definition.name},
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': this.definition.coordinates // each shape consists of array pairs of lat/lng wrapped in an array, with outer array ?for multiple polygons (i.e. three levels of array nesting)
                }
            }
        });

        this._addPolygonMarkerLayersToMap(map);
    }

    /**
     *
     * @param {mapboxgl.Map} map
     */
    _addPolygonMarkerLayersToMap(map) {
        if (this.definition.fillColour) {
            let paint = {
                'fill-color':this.definition.fillColour
            };

            if (this.definition.fillOpacity) {
                paint['fill-opacity'] = this.definition.fillOpacity;
            }

            map.addLayer({
                'id': `${this.markerId}-fill`,
                'type': 'fill',
                'source': this.markerId, // reference the data source
                'layout': {},
                'paint': paint
            });
        }

        if (this.definition.lineColour) {
            let paint = {
                'line-color': this.definition.lineColour
            };

            if (this.definition.lineOpacity) {
                paint['line-opacity'] = this.definition.lineOpacity;
            }

            if (this.definition.lineWidth) {
                paint['line-width'] = this.definition.lineWidth;
            }

            map.addLayer({
                'id': `${this.markerId}-line`,
                'type': 'line',
                'source': this.markerId, // reference the data source
                'layout': {},
                'paint': paint
            });
        }

        this.visible = true;
    }

    /**
     *
     * @param {mapboxgl.Map} map
     * @param {Array} newCoordinates
     * @param {string} newName
     */
    updateCoordinates(map, newCoordinates, newName) {
        this.definition.coordinates = newCoordinates;
        this.definition.name = newName;

        let source = map.getSource(this.markerId);
        source.setData({
            'type': 'Feature',
            "properties": {"name": this.definition.name},
            'geometry': {
                'type': 'Polygon',
                'coordinates': this.definition.coordinates // each shape consists of array pairs of lat/lng wrapped in an array, with outer array ?for multiple polygons (i.e. three levels of array nesting)
            }});

        if (!this.visible) {
            this._addPolygonMarkerLayersToMap(map);
        }
    }

    /**
     *
     * @param {mapboxgl.Map} map
     */
    removeFromMap(map) {
        map.removeSource(this.markerId);
        this.visible = false;
    }
}