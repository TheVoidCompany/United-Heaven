import { Box, useColorMode } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Source } from 'react-map-gl';
import MapWrapper from '../../components/map/MapWrapper';
import OverlayCard from '../../components/OverlayCard';
import { countryLayer, countryOutline, selectedCountryFill } from './mapTilesStyle';

const SDGPage = () => {

    const mapRef = useRef();

    const [hoveredCountryId, sethoveredCountryId] = useState(null);
    const [hoveredCountry, sethoveredCountry] = useState(null);
    const [selectedCountry, setselectedCountry] = useState('null');
    const { colorMode } = useColorMode()


    useEffect(() => {

        return () => {
            setselectedCountry(null);
        }

    }, [])


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
            sethoveredCountry(hoveredFeature.properties);
        }

    }, [hoveredCountryId]);

    const onLeave = useCallback(() => {
        if (hoveredCountryId !== null) {
            mapRef.current.setFeatureState({
                source: 'country',
                id: hoveredCountryId
            }, { hover: false });
            sethoveredCountryId(null);
            sethoveredCountry(null);
        }
    }, [hoveredCountryId]);


    const onMapClick = useCallback((event) => {

        const eventCountry = event.features[0]?.properties.name;
        if (selectedCountry !== 'null' && selectedCountry.name === eventCountry) {
            setselectedCountry('null');
        } else {
            setselectedCountry(event.features[0].properties);
        }

    }, [selectedCountry]);

    return (
        <Box w="100vw" h="92vh">
            <MapWrapper
                interactiveLayerIds={['country-layer', 'country-outline']}
                ref={mapRef}
                onMouseMove={onHover}
                onMouseLeave={onLeave}
                onClick={onMapClick}
            >
                <Source generateId={true} id="country" type="geojson" data='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'>
                    <Layer {...countryLayer(colorMode)} />
                    <Layer {...countryOutline(colorMode)} />
                    <Layer {...selectedCountryFill(colorMode, selectedCountry)} />
                </Source>
                {hoveredCountry && <OverlayCard
                    title={hoveredCountry?.name}
                    position={selectedCountry !== 'null' ? { left: '50%' } : { left: '0' }}
                    customStyles={selectedCountry !== 'null' ? { transform: 'translateX(-50%)' } : {}}
                />
                }

            </MapWrapper>
            {selectedCountry !== 'null' && <OverlayCard
                title={selectedCountry.name}
                closeButton
                onClose={() => setselectedCountry('null')}
                position={{ right: '0', bottom: '0' }}
                customStyles={{ minWidth: '300', height: '86vh' }}
            >
                <p>continent: {selectedCountry.continent}</p>
                <p>income group: {selectedCountry.income_grp}</p>
            </OverlayCard>
            }
        </Box>
    );
}

export default SDGPage