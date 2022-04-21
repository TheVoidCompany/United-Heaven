import { useColorMode } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { Layer, Source } from 'react-map-gl';
import MapWrapper from '../../components/map/MapWrapper';
import CountryGeoJson from '../../data/countries.geojson';
import { countryLayer, countryOutline, selectedCountryFill } from './mapTilesStyle';

const AreaMap = ({ selectedCountry, setSelectedCountry, setHoveredCountry }) => {

    const mapRef = useRef();

    const [hoveredCountryId, sethoveredCountryId] = useState(null);

    const { colorMode } = useColorMode()


    const onHover = useCallback(event => {

        if (event.features.length > 0) {

            const hoveredFeature = event.features[0];

            if (hoveredCountryId !== null) {

                if (hoveredFeature.id === hoveredCountryId) {
                    return;
                }

                mapRef.current.setFeatureState({
                    source: 'country',
                    id: hoveredCountryId
                }, { hover: false });
            }

            mapRef.current.setFeatureState({
                source: 'country',
                id: hoveredFeature.id
            }, { hover: true });

            sethoveredCountryId(hoveredFeature.id);
            const hoveredCountryObj = {
                id: "5",
                name: hoveredFeature.properties.ADMIN,
                iso3: hoveredFeature.properties.ISO_A3,
                latitude: "20.5937",
                longitude: "78.9629"
            };
            setHoveredCountry(hoveredCountryObj);
        }

    }, [hoveredCountryId, setHoveredCountry]);

    const onLeave = useCallback(() => {
        if (hoveredCountryId !== null) {
            mapRef.current.setFeatureState({
                source: 'country',
                id: hoveredCountryId
            }, { hover: false });
            sethoveredCountryId(null);
            setHoveredCountry(null);
        }
    }, [hoveredCountryId, setHoveredCountry]);

    const onMapClick = useCallback((event) => {

        const eventCountry = event.features[0]?.properties.ADMIN;
        const eventCountryIso3 = event.features[0]?.properties.ISO_A3;
        if (selectedCountry !== null && selectedCountry.name === eventCountry) {
            setSelectedCountry(null);
        } else {
            const selectedCountryObj = {
                id: "5",
                name: eventCountry,
                iso3: eventCountryIso3,
                latitude: "20.5937",
                longitude: "78.9629"
            };

            setSelectedCountry(selectedCountryObj);
        }
    }, [selectedCountry, setSelectedCountry]);


    return (
        <MapWrapper
            interactiveLayerIds={['country-layer', 'country-outline']}
            ref={mapRef}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            onClick={onMapClick}
        >
            <Source generateId={true} id="country" type="geojson" data={CountryGeoJson}>
                <Layer {...countryLayer(colorMode)} />
                <Layer {...countryOutline(colorMode)} />
                <Layer {...selectedCountryFill(colorMode, selectedCountry)} />
            </Source>
        </MapWrapper>
    )
}

export default AreaMap