import {
    Flex, Spinner
} from '@chakra-ui/react';

function LoadingScreen({ size = 'md' }) {
    return (
        <Flex w="100%" h="100%" align="center" justify="center">
            <Spinner size={size} />
        </Flex>
    )
}

export default LoadingScreen
