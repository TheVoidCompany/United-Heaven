import { Flex, Spinner } from '@chakra-ui/react';

function LoadingScreen({ size = 'md', color }) {
    return (
        <Flex h={"100%"} align={"center"} justify={"center"}>
            <Spinner size={size} color={color} />
        </Flex>
    )
}

export default LoadingScreen
