export class MapMarker {
    /**
     * @type {string}
     */
    markerName;

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

    static TYPE_POLYGON = 'polygon';
    static TYPE_POINT = 'point';

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
        this.markerName = definition.name;
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

        // e.g. see https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
        map.addSource(this.markerName, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': this.definition.coordinates // each shape consists of array pairs of lat/lng wrapped in an array, with outer array ?for multiple polygons (i.e. three levels of array nesting)
                }
            }
        });

        if (this.definition.fillColour) {
            let paint = {
                'fill-color':this.definition.fillColour
            };

            if (this.definition.fillOpacity) {
                paint['fill-opacity'] = this.definition.fillOpacity;
            }

            map.addLayer({
                'id': `${this.markerName}-fill`,
                'type': 'fill',
                'source': this.markerName, // reference the data source
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
                'id': `${this.markerName}-line`,
                'type': 'line',
                'source': this.markerName, // reference the data source
                'layout': {},
                'paint': paint
            });
        }
    }

    /**
     *
     * @param {mapboxgl.Map} map
     */
    removeFromMap(map) {
        map.removeSource(this.markerName)
    }
}
