import { Divider, Flex, Hide, Spacer } from "@chakra-ui/react";

const ThreeColumnStructure = ({ children }) => {
    return (
        <Flex minH="82vh">
            <Hide below="md">
                <Flex flex={1}>
                    {children[0]}
                    <Spacer />
                    <Divider orientation='vertical' />
                </Flex>
            </Hide>
            <Flex bg="yellow" flex={2} direction="column">
                {children[1]}
            </Flex>
            <Hide below="lg">
                <Flex flex={1}>
                    <Divider orientation='vertical' />
                    {children[2]}
                </Flex>
            </Hide>
        </Flex>
    )
}

export default ThreeColumnStructure