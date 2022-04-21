import { Box, Button, Flex, Tab, TabList, Tabs, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import OverlayCard from '../../components/cards/OverlayCard';
import { FakeSuggestions } from '../../data/FakeSuggestions';
import CountryDetailsPopup from './CountryDetailsPopup';
import MarkerMap from './MarkerMap';

const SuggestionsPage = () => {

    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const isSmallSize = useBreakpointValue({ base: true, lg: false });
    const [showSuggestionOverlay, setShowSuggestionOverlay] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setShowSuggestionOverlay(isSmallSize ? false : true);
    }, [isSmallSize])



    return (
        <Box w="100vw" h="92vh" position='relative'>
            <MarkerMap
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setHoveredCountry={setHoveredCountry}
            />
            {!isSmallSize && (
                <CountryDetailsPopup
                    hoveredCountry={hoveredCountry}
                    selectedCountry={selectedCountry}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
            <Tabs
                variant="unstyled"
                onChange={(index) => setTabIndex(index)}
            >
                <TabList
                    position={"fixed"}
                    zIndex={10}
                    left={isSmallSize ? "50%" : 10}
                    transform={isSmallSize && "translateX(-50%)"}
                    bottom={10}
                    boxShadow="lg"
                >
                    <Tab
                        borderLeftRadius="6"
                        minW="180"
                        bg={useColorModeValue("#EDECEC", "gray.800")}
                        _selected={{ color: "white", bg: "black" }}
                        color="gray.500"
                        _focus={{ boxShadow: "none" }}>
                        Global
                    </Tab>
                    <Tab
                        borderRightRadius="6"
                        minW="180"
                        bg={useColorModeValue("#EDECEC", "gray.800")}
                        color="gray.500"
                        _selected={{ color: "white", bg: "black" }}
                        _focus={{ boxShadow: "none" }}
                    >
                        National
                    </Tab>
                </TabList>
            </Tabs>
            {showSuggestionOverlay || (isSmallSize && selectedCountry !== null) ? (
                <OverlayCard
                    title={selectedCountry !== null ? selectedCountry.name : 'Priorities'}
                    titleOnClick={() => selectedCountry !== null ? navigate(`/profiles/${selectedCountry.iso3.toLowerCase()}`) : null}
                    onClose={(selectedCountry !== null && isSmallSize) ? null : () => setShowSuggestionOverlay(false)}
                    onBack={selectedCountry !== null ? (() => setSelectedCountry(null)) : null}
                    position={{ right: '0', bottom: '0' }}
                    width={340}
                    customStyles={{ height: '94%' }}
                    divider
                    isSmallSize={isSmallSize}
                >
                    {selectedCountry !== null ? (
                        FakeSuggestions.map(country => {
                            if (country.iso3 === selectedCountry.iso3) {
                                return (
                                    <Flex key={country.id} align="center" onClick={() => navigate(`/profiles/${country.iso3.toLowerCase()}/goal${country.goal}`)}>
                                        <Text
                                            p={2}
                                            cursor='pointer'
                                            fontWeight={"bold"}
                                        >
                                            {`${country.suggestionRank}. ${country.description}`}
                                        </Text>
                                        <RiArrowRightCircleFill fontSize={"20px"} />
                                        <Text
                                            p={2}
                                            cursor='pointer'
                                            fontWeight={"bold"}
                                        >
                                            {country.name}
                                        </Text>
                                    </Flex>
                                )
                            }
                            return null;
                        })
                    ) : (
                        FakeSuggestions.map(country => {
                            return (
                                <Flex key={country.id} align="center" onClick={() => navigate(`/profiles/${country.iso3.toLowerCase()}/goal${country.goal}`)}>
                                    <Text

                                        p={2}
                                        cursor='pointer'
                                        fontWeight={"bold"}
                                    // textShadow={country.iso3 === hoveredCountry?.iso3 && `1px 1px 8px`}
                                    >
                                        {`${country.suggestionRank}. ${country.description}`}
                                    </Text>
                                    <RiArrowRightCircleFill fontSize={"20px"} className={country.iso3 === hoveredCountry?.iso3 && "blink_me"} />
                                    <Text
                                        p={2}
                                        cursor='pointer'
                                        fontWeight={"bold"}
                                    >
                                        {country.name}
                                    </Text>
                                </Flex>

                            )
                        })
                    )}
                </OverlayCard>
            ) : (
                <Button
                    variant="solid"
                    position='fixed'
                    right='0'
                    top='10vh'
                    onClick={() => setShowSuggestionOverlay(true)}
                    mb={isSmallSize ? 4 : 14}
                    mr={4}
                >
                    Show Suggestions
                </Button>
            )}

        </Box>
    )
}

export default SuggestionsPage