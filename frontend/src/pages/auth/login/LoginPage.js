import { Box, Container, Heading, Image, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import UserLoginDetails from './UserLoginDetails';

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

const LoginPage = () => {

    const navigate = useNavigate();

    const onSignupClick = () => {
        navigate('/signup');
    }


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
                        fontWeight={800}
                    >
                        Welcome back!
                    </Heading>
                    <Box position={"absolute"} w="600px" h="600px" overflow={"clip"} bottom={0} filter='grayscale(80%)' display={{ base: "none", lg: "block" }}>
                        <Slider {...settings}>
                            <div>
                                <Image src={require(`../../../images/welcomepics/person1.webp`)} />
                            </div>
                            <div>
                                <Image src={require(`../../../images/welcomepics/person2.webp`)} />
                            </div>
                            <div>
                                <Image src={require(`../../../images/welcomepics/person3.webp`)} />
                            </div>
                        </Slider>
                    </Box>
                </Stack>
                <UserLoginDetails onSignupClick={onSignupClick} />
            </Container>
        </Box>
    );
}



export default LoginPage;