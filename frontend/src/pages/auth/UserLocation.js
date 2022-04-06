import { Heading, Image, Stack, Text } from '@chakra-ui/react';


const UserLocation = () => {
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
            <Image boxSize={"200"} src={require('../../images/locationIcon.png')} />
            <Stack spacing={4}>
                <Heading
                    color={'gray.800'}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Enable Geolocation
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    All us to provide you with relevant actions based on your location.
                    We will not share your location with anyone else.
                </Text>
            </Stack>
        </Stack>
    )
}

export default UserLocation