import { memo } from 'react';
import { Marker } from 'react-map-gl';
import PulseMarker from '../marker/PulseMarker';

const MarkerWrapper = ({ country, setHoveredMarker }) => {

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
                country={country}
            />
        </Marker>
    )
}

export default memo(MarkerWrapper);
