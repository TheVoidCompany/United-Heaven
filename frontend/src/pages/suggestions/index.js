import { Box, Button, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useNavigate } from 'react-router';
import MapWrapper from '../../components/map/MapWrapper';
import PulseMarker from '../../components/marker/PulseMarker';
import OverlayCard from '../../components/OverlayCard';
import { FakeSuggestions } from '../../data/FakeSuggestions';
import CountryDetailsPopup from './CountryDetailsPopup';

const SuggestionsPage = () => {

    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const isSmallSize = useBreakpointValue({ base: true, lg: false });
    const [showSuggestionOverlay, setShowSuggestionOverlay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowSuggestionOverlay(isSmallSize ? false : true);
    }, [isSmallSize])



    const markers = useMemo(() => {

        //get countries object with unique iso3 values
        const uniqueCountries = FakeSuggestions.reduce((acc, country) => {
            if (!acc[country.iso3]) {
                acc[country.iso3] = country;
            }
            return acc;
        }, {});

        //get array of countries with unique iso3 values
        const uniqueCountriesArray = Object.values(uniqueCountries);



        return uniqueCountriesArray.map(country => {

            return (
                <Marker
                    key={country.id}
                    longitude={country.longitude}
                    latitude={country.latitude}
                    anchor="bottom"
                >
                    <PulseMarker
                        text={country.totalGoals}
                        setHoveredMarker={setHoveredMarker}
                        setSelectedMarker={setSelectedMarker}
                        selectedMarker={selectedMarker}
                        markerValue={country}

                    />
                </Marker>
            )
        })

    }, [selectedMarker]);


    return (
        <Box w="100vw" h="92vh" position='relative'>
            <MapWrapper>
                {markers}
            </MapWrapper>
            {!isSmallSize && (
                <CountryDetailsPopup
                    hoveredMarker={hoveredMarker}
                    selectedMarker={selectedMarker}
                    onClose={() => setSelectedMarker(null)}
                />
            )}
            {showSuggestionOverlay || (isSmallSize && selectedMarker !== null) ? (
                <OverlayCard
                    title={selectedMarker !== null ? selectedMarker.name : 'Suggestions'}
                    onClose={(selectedMarker !== null && isSmallSize) ? null : () => setShowSuggestionOverlay(false)}
                    onBack={selectedMarker !== null ? (() => setSelectedMarker(null)) : null}
                    position={{ right: '0', bottom: '0' }}
                    width={340}
                    customStyles={{ height: '94%' }}
                    divider
                    isSmallSize={isSmallSize}
                >
                    {selectedMarker !== null ? (
                        FakeSuggestions.map(country => {
                            if (country.iso3 === selectedMarker.iso3) {
                                return (
                                    <Text
                                        key={country.id}
                                        p={2}
                                        cursor='pointer'
                                        fontWeight={"bold"}
                                        onClick={() => navigate(`/${country.name}/goal${country.goal}`)}
                                    >
                                        {`${country.suggestionRank}. ${country.description}`}
                                    </Text>
                                )
                            }
                            return null;
                        })
                    ) : (
                        FakeSuggestions.map(country => {
                            return (
                                <Text
                                    key={country.id}
                                    p={2}
                                    cursor='pointer'
                                    fontWeight={"bold"}
                                    onClick={() => navigate(`/${country.name}/goal${country.goal}`)}
                                    textShadow={country.iso3 === hoveredMarker?.iso3 && `1px 1px 8px`}
                                >
                                    {`${country.suggestionRank}. ${country.description}`}
                                </Text>
                            )
                        })
                    )}
                </OverlayCard>
            ) : (
                <Button
                    variant="solid"
                    position='fixed'
                    right='0'
                    bottom='0'
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