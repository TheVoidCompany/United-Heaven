import {
    Box, Button, Flex, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Skeleton, Text, useBreakpointValue, useColorMode, VStack
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoChevronUpOutline } from 'react-icons/io5';
import { Layer, Source } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import OverlayCard from '../../components/cards/OverlayCard';
import MapWrapper from '../../components/map/MapWrapper';
import MouseOverlayWrapper from '../../components/MouseOverlayWrapper';
import CountryGeoJson from '../../data/countries.geojson';
import { countryLayer, countryOutline, selectedCountryFill } from './mapTilesStyle';

const SIGHTOPTIONS = ["SDG 1", "SDG 2", "SDG 3", "SDG 4", "SDG 5", "SDG 6", "SDG 7", "SDG 8",
    "SDG 9", "SDG 10", "SDG 11", "SDG 12", "SDG 13", "SDG 14", "SDG 15", "SDG 16", "SDG 17"];

const SightPage = () => {

    const mapRef = useRef();

    const [hoveredCountryId, sethoveredCountryId] = useState(null);
    const [hoveredCountry, sethoveredCountry] = useState(null);
    const [selectedCountry, setselectedCountry] = useState('null');
    const isSmallSize = useBreakpointValue({ base: true, lg: false });
    const [insightMode, setInsightMode] = useState("Index Score");
    const navigate = useNavigate();

    const { colorMode } = useColorMode()

    useEffect(() => {
        console.log(insightMode);
    }, [insightMode])

    const handleSightChange = useCallback((mode) => {
        setInsightMode(mode);
    }, []);



    const onHover = useCallback(event => {

        if (event.features.length > 0) {

            const hoveredFeature = event.features[0];
            console.log(hoveredFeature)

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

        const eventCountry = event.features[0]?.properties.ADMIN;
        const eventCountryIso3 = event.features[0]?.properties.ISO_A3;
        if (insightMode !== "Country Details") {
            navigate(`/profiles/${eventCountryIso3.toLowerCase()}`);
        } else {
            if (selectedCountry !== 'null' && selectedCountry.ADMIN === eventCountry) {
                setselectedCountry('null');
            } else {
                setselectedCountry(event.features[0].properties);
            }
        }
    }, [selectedCountry, insightMode, navigate]);

    const MenuItems = ({ mode }) => {
        return (
            <MenuItem
                rounded={"md"}
                bg={insightMode === mode && "gray.800"}
                _focus={{ bg: insightMode === mode ? "gray.800" : "gray.600" }}
                onClick={() => handleSightChange(mode)}
                py={4}
                px={3}
            >
                {mode}
            </MenuItem>
        )
    }

    return (
        <Box w="100vw" h="92vh" position='relative'>
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
                {hoveredCountry && !isSmallSize && <MouseOverlayWrapper
                >
                    <Flex>
                        <Image
                            mr="10px"
                            boxSize={"80px"}
                            src={require(`../../images/Flags/${hoveredCountry?.ISO_A2.toLowerCase()}.png`)}
                            fallbackSrc={require('../../images/image-placeholder.png')}
                            fallback={<Skeleton height="80px" />}
                        />
                        <VStack align={"start"} justify={"center"}>
                            <Text fontSize={'xl'} fontWeight='bold' noOfLines={1}>{hoveredCountry?.ADMIN}</Text>
                            <Text fontSize={'md'} fontWeight='400' noOfLines={1} style={{ marginTop: "2px" }}>Significantly high</Text>
                        </VStack>
                    </Flex>
                </MouseOverlayWrapper>
                }

            </MapWrapper>
            {selectedCountry !== 'null' && insightMode === "Country Details" && <OverlayCard
                title={selectedCountry.ADMIN}
                onClose={() => setselectedCountry('null')}
                position={{ left: '0', bottom: '0' }}
                customStyles={{ height: '94%' }}
                divider
                width={340}
                isSmallSize={isSmallSize}
                titleOnClick={() => navigate(`/profiles/${selectedCountry.ISO_A3.toLowerCase()}`)}
            >
                <p>ISO2: {selectedCountry.ISO_A2}</p>
                <p>ISO3: {selectedCountry.ISO_A3}</p>
            </OverlayCard>
            }
            <Box
                position='fixed'
                right='0'
                bottom='0'
                mb={10}
                mr={6}
            >
                <Menu isLazy autoSelect={false}>
                    <MenuButton
                        as={Button}
                        _focus={{ outline: 'none' }}
                        rightIcon={<IoChevronUpOutline />}
                    >
                        {insightMode}
                    </MenuButton>
                    <MenuList
                        maxH="46vh"
                        overflow={"scroll"}
                        minW="300px"
                        p={2}
                    >
                        <MenuItems mode="Index Score" />
                        <MenuItems mode="Spillover Score" />
                        <MenuItems mode="Country Details" />
                        <MenuDivider />
                        {SIGHTOPTIONS.map((option) => (
                            <MenuItems mode={option} />
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    );
}



export default SightPage