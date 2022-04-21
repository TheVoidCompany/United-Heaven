import { useColorModeValue } from '@chakra-ui/react';
import mapboxgl from "mapbox-gl";
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import MapGL, { AttributionControl } from 'react-map-gl';
import mapStyles from './mapStyles.constant';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapWrapper = forwardRef(({ children, ...otherAttributes }, mapRef) => {


    const mapTheme = useColorModeValue(mapStyles.light, mapStyles.dark);

    //initial map view
    const [viewState, setViewState] = useState({
        longitude: 20,
        latitude: 30,
        zoom: 1.5
    });


    //escape button to set map to default view
    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setViewState({
                    longitude: 20,
                    latitude: 30,
                    zoom: 1.5
                });
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <MapGL
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={mapTheme}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            reuseMaps
            attributionControl={false}
            ref={mapRef}
            {...otherAttributes}
        >
            {children}
            <AttributionControl style={{ color: "black" }} customAttribution="Powered by Tigergraph" />
        </MapGL>
    )
});

MapWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default MapWrapper