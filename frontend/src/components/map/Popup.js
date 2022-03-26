import { Box, Image, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';


const Popup = ({ country }) => {

    const popupColor = useColorModeValue('#F6FBFFBB', '#061626BB');

    return (
        <Box
            bg={popupColor}
            zIndex={2}
            position="absolute"
            top={0}
            p="4"
            margin="6"
            borderRadius={6}
        >
            <Text
                fontSize='2xl'
                fontWeight='bold'
                mb="4"
            >
                {country.location}
            </Text>
            <SimpleGrid columns={3} spacing={5}>
                {country.goals.map((goal) => (
                    <Image
                        boxSize='90px'
                        objectFit='cover'
                        src={require(`../../images/SDGIcons/Goal${goal}.png`)}
                        alt={`SDG Goal ${goal}`}
                    />
                ))}
            </SimpleGrid>

        </Box>
    )
}

export default Popup