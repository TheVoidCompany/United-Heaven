import { memo } from 'react';
import { Marker } from 'react-map-gl';
import PulseMarker from '../marker/PulseMarker';

const MarkerWrapper = ({ id, latitude, longitude, text }) => {
    return (
        <Marker
            key={id}
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
        >
            <PulseMarker text={text} />
        </Marker>
    )
}

export default memo(MarkerWrapper);
