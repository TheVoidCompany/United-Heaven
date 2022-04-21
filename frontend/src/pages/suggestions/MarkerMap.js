import { useMemo } from 'react';
import { Marker } from 'react-map-gl';
import MapWrapper from '../../components/map/MapWrapper';
import PulseMarker from '../../components/marker/PulseMarker';
import { FakeSuggestions } from '../../data/FakeSuggestions';

const MarkerMap = ({ selectedCountry, setSelectedCountry, setHoveredCountry }) => {



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
                        setHoveredCountry={setHoveredCountry}
                        setSelectedCountry={setSelectedCountry}
                        selectedCountry={selectedCountry}
                        markerValue={country}

                    />
                </Marker>
            )
        })

    }, [selectedCountry, setSelectedCountry, setHoveredCountry]);

    return (
        <MapWrapper>
            {markers}
        </MapWrapper>
    )
}

export default MarkerMap