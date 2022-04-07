import { Box, Container, Heading, Image, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import Slider from "react-slick";
import UserDetails from './UserDetails';
import UserLocation from './UserLocation';
import UserSocial from './UserSocial';



const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: false,
    fade: true,
    pauseOnHover: false
};

const SignupPage = () => {

    const [currentView, setCurrentView] = useState('user details');

    return (
        <Box position={'relative'} bg={useColorModeValue('gray.100', 'gray.900')} h="92vh">
            <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }} px={{ base: 0, md: 6, xl: 0 }}>
                    <Heading
                        lineHeight={1.2}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                        fontWeight={700}
                    >
                        Let's create a heaven for everyone
                    </Heading>
                    <Box position={"absolute"} w="600px" h="600px" overflow={"clip"} bottom={0} filter='grayscale(80%)' display={{ base: "none", lg: "block" }}>
                        <Slider {...settings}>
                            <div>
                                <Image src={require(`../../images/welcomepics/person1.webp`)} />
                            </div>
                            <div>
                                <Image src={require(`../../images/welcomepics/person2.webp`)} />
                            </div>
                            <div>
                                <Image src={require(`../../images/welcomepics/person3.webp`)} />
                            </div>
                        </Slider>
                    </Box>
                </Stack>
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
                        <UserDetails goNext={() => setCurrentView('user location')} />
                    )}
                    {currentView === 'user location' && (
                        <UserLocation />
                    )}
                    {currentView === 'user social' && (
                        <UserSocial />
                    )}
                </Stack>
            </Container>
        </Box>
    );
}



export default SignupPage;