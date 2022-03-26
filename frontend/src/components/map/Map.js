import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import MapGL, { AttributionControl, ScaleControl } from 'react-map-gl';
import { FakeSuggestions } from '../../data/FakeSuggestions';
import mapStyles from './mapStyles';
import MarkerWrapper from './MarkerWrapper';
import Popup from './Popup';

const Map = () => {

    const [hoveredMarker, setHoveredMarker] = useState(null);
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

    useEffect(() => {
        console.log('hoveredMarker', hoveredMarker);
    }, [hoveredMarker])



    return (
        <MapGL
            id="suggestionMap"
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={mapTheme}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            reuseMaps
            attributionControl={false}
        >
            <ScaleControl />
            {FakeSuggestions.map((country) => (
                <MarkerWrapper
                    country={country}
                    setHoveredMarker={setHoveredMarker}
                />
            ))}
            {hoveredMarker ? (
                <Popup
                    country={hoveredMarker}
                />
            ) : null}
            <AttributionControl style={{ color: "black" }} customAttribution="Powered by Tigergraph" />
        </MapGL>
    )
}

export default Map