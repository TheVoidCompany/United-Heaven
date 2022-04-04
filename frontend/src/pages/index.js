import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';

const UnitedHeaven = () => {
    return (
        <>
            <Box w='100vw' minH='8vh'>
                <NavBar />
            </Box>
            <Box w='100vw' minH='100%'>
                <Outlet />
            </Box>
        </>
    )
}

export default UnitedHeaven