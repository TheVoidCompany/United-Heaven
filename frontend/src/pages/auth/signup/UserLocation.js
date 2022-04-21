import { Heading, Image, Spinner, Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { geolocated } from "react-geolocated";
import { UserContext } from '../../../context/userContext';

const UserLocation = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [loadingLocation, setloadingLocation] = useState(false);

    useEffect(() => {
        if (!props.isGeolocationAvailable || !props.isGeolocationEnabled) {
            props.goNext();
        } else if (props.coords) {
            props.setForm({
                ...props.form,
                location: {
                    latitude: props.coords.latitude,
                    longitude: props.coords.longitude
                }
            });
            props.goNext();
        } else if (props.isGeolocationAvailable && props.isGeolocationEnabled && !props.coords) {
            setloadingLocation(true);
        }

    }, [props, setCurrentUser, currentUser]);



    return (
        <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
            align="center"
            textAlign={"center"}
            h="500px"
        >
            <Image boxSize={"200"} src={require('../../../images/locationIcon.png')} />
            <Stack spacing={4}>
                <Heading
                    color={'gray.800'}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    {!loadingLocation ? 'Enable Geolocation' : <span> <Spinner mr="2" size='lg' /> Locating you...</span>}
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Allow us to provide you with relevant actions based on your location.
                    We will not share your location with anyone else.
                </Text>
            </Stack>
        </Stack>
    )
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    }
})(UserLocation);