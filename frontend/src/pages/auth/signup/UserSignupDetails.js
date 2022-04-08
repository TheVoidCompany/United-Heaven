import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import UserDetails from './UserDetails';
import UserLocation from './UserLocation';
import UserSocial from './UserSocial';

const UserSignupDetails = ({ onLoginClick }) => {

    const [currentView, setCurrentView] = useState('user details');


    return (
        <Stack
            bg={'gray.50'}
            rounded={'xl'}
            zIndex={20}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
            minH="500px"
        >
            {currentView === 'user details' && (
                <UserDetails onLoginClick={onLoginClick} goNext={() => setCurrentView('user location')} />
            )}
            {currentView === 'user location' && (
                <UserLocation goNext={() => setCurrentView('user social')} />
            )}
            {currentView === 'user social' && (
                <UserSocial />
            )}
        </Stack>
    )
}

export default UserSignupDetails