import { Box, Button, Flex, Image, Skeleton, Text, useBreakpointValue, useColorMode, VStack } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { Layer, Source } from 'react-map-gl';
import OverlayCard from '../../components/cards/OverlayCard';
import MapWrapper from '../../components/map/MapWrapper';
import MouseOverlayWrapper from '../../components/MouseOverlayWrapper';
import { countryLayer, countryOutline, selectedCountryFill } from './mapTilesStyle';

const SightPage = () => {

    const mapRef = useRef();

    const [hoveredCountryId, sethoveredCountryId] = useState(null);
    const [hoveredCountry, sethoveredCountry] = useState(null);
    const [selectedCountry, setselectedCountry] = useState('null');
    const [showCharityOverlay, setShowCharityOverlay] = useState(true);
    const isSmallSize = useBreakpointValue({ base: true, lg: false });

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
        <Box w="100vw" h="92vh" position='relative'>
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
                {hoveredCountry && !isSmallSize && <MouseOverlayWrapper
                >
                    <Flex>
                        <Image
                            mr="10px"
                            boxSize={"80px"}
                            src={require(`../../images/Flags/${hoveredCountry?.iso_a2.toLowerCase()}.png`)}
                            fallbackSrc={require('../../images/image-placeholder.png')}
                            fallback={<Skeleton height="80px" />}
                        />
                        <VStack align={"start"} justify={"center"}>
                            <Text fontSize={'xl'} fontWeight='bold' noOfLines={1}>{hoveredCountry?.name}</Text>
                            <Text fontSize={'md'} fontWeight='400' noOfLines={1}>Significantly high</Text>
                        </VStack>
                    </Flex>
                </MouseOverlayWrapper>
                }

            </MapWrapper>
            {selectedCountry !== 'null' && <OverlayCard
                title={selectedCountry.name}
                onClose={() => setselectedCountry('null')}
                position={{ right: '0', bottom: '0' }}
                customStyles={{ height: '94%' }}
                divider
                width={340}
                isSmallSize={isSmallSize}
            >
                <p>continent: {selectedCountry.continent}</p>
                <p>income group: {selectedCountry.income_grp}</p>
            </OverlayCard>
            }
            {showCharityOverlay ? (

                selectedCountry !== 'null' && !isSmallSize && <OverlayCard
                    title={"Charity"}
                    onClose={() => setShowCharityOverlay(false)}
                    position={{ left: '0', bottom: '0' }}
                    customStyles={{ height: '86vh' }}
                    divider
                    width={340}
                >
                    <p>1. DEAN FOUNDATION, HOSPICE AND PALLIATIVE CARE CENTER</p>
                    <p>2. DEAN FOUNDATION, HOSPICE AND PALLIATIVE CARE CENTER</p>
                </OverlayCard>

            ) : (
                <Button
                    variant="solid"
                    position='fixed'
                    colorScheme={"gray"}
                    left='0'
                    bottom='0'
                    onClick={() => setShowCharityOverlay(true)}
                    mb={20}
                    ml={4}
                >
                    Show Charity
                </Button>
            )}
        </Box>
    );
}

export default SightPage