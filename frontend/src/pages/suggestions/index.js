import { Box } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Marker } from 'react-map-gl';
import MapWrapper from '../../components/map/MapWrapper';
import PulseMarker from '../../components/marker/PulseMarker';
import { FakeSuggestions } from '../../data/FakeSuggestions';
import CountryDetailsPopup from './CountryDetailsPopup';


const SuggestionsPage = () => {

    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);


    const markers = useMemo(() => {

        return FakeSuggestions.map(country => {

            return (
                <Marker
                    key={country.id}
                    longitude={country.longitude}
                    latitude={country.latitude}
                    anchor="bottom"
                >
                    <PulseMarker
                        text={country.suggestionRank}
                        setHoveredMarker={setHoveredMarker}
                        setSelectedMarker={setSelectedMarker}
                        markerValue={country}

                    />
                </Marker>
            )
        })

    }, []);


    return (
        <Box w="100vw" h="100vh" position='relative'>
            <MapWrapper>
                {markers}
            </MapWrapper>
            <CountryDetailsPopup
                hoveredMarker={hoveredMarker}
                selectedMarker={selectedMarker}
                onClose={() => setSelectedMarker(null)}
            />
        </Box>
    )
}

export default SuggestionsPage