import { Flex, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Heading from '../common/Heading';


const TrendingCard = ({ type, heading, image }) => {

    const findTypeColor = (typeName) => {

        const type = typeName.toLowerCase();
        if (type === "action") {
            return 'green.500'
        } else if (type === "news") {
            return 'yellow.500'
        } else {
            return 'red.500'
        }
    }



    return (
        <Flex p={5}
            cursor="pointer"
            _hover={{
                backgroundColor: useColorModeValue('gray.100', 'gray.800')
            }}
            justifyContent="space-between"
        >
            <Stack alignSelf="flex-start">
                <Text
                    color={findTypeColor(type)}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize="12"
                    letterSpacing={1.1}
                >

                    {type}

                </Text>
                <Heading
                    size="md"
                    customStyles={{ noOfLines: 3 }}
                    isExternal={type === "news" || type === "event"}
                >
                    {heading}
                </Heading>
            </Stack>
            <Image
                src={image}
                boxSize='100px'
                objectFit={'cover'}
                objectPosition="center center"
                rounded={'lg'}
                ml="4"

            />
        </Flex>
    )
}

export default TrendingCard