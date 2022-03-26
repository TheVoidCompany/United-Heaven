import { Popup as PopupGL } from 'react-map-gl';

const Popup = () => {
    return (
        <PopupGL
            closeButton={false}
            closeOnMove={true}
        >
            <div>
                <h1>India</h1>
            </div>
        </PopupGL>
    )
}

export default Popup