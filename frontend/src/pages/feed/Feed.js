import { Box, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import FeedNavbar from '../../components/navbar/FeedNavbar';

const Feed = () => {
    return (
        <Box bg={useColorModeValue('white', 'gray.900')}>
            <Box w='100vw' minH='8vh' >
                <FeedNavbar />
            </Box>
            <Box w='100vw' minH='84vh' paddingX={{ base: '2%', '2xl': '8%' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Feed