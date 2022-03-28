import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const UnitedHeaven = () => {
    return (
        <>
            <NavBar />
            <Box w='100vw' h='92vh'>
                <Outlet />
            </Box>
        </>
    )
}

export default UnitedHeaven