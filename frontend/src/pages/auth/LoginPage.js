import { Box, Button, Checkbox, Container, Heading, Image, Input, InputGroup, InputRightElement, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

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

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


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
                                <Image src={require(`../../images/person1.png`)} />
                            </div>
                            <div>
                                <Image src={require(`../../images/person2.png`)} />
                            </div>
                            <div>
                                <Image src={require(`../../images/person3.png`)} />
                            </div>
                        </Slider>
                    </Box>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Let's sign you in
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'lg', sm: 'xl' }}>
                            Welcome back to the community. You've been missed!
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Email Id"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                type="email"
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                            />
                            <InputGroup size='md'>
                                <Input
                                    placeholder="Password"
                                    bg={'gray.100'}
                                    pr='4.5rem'
                                    border={0}
                                    type={show ? 'text' : 'password'}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' bg={'gray.100'} color="black" onClick={handleClick} _focus={{ outline: 0 }}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Checkbox px="1" color={"black"} borderColor={"gray.300"} iconColor={"white"}>Remember me</Checkbox>
                        </Stack>
                        <Button
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bg={'green.500'}
                            color={'white'}
                            _hover={{
                                bg: 'green.600',
                                boxShadow: 'xl',
                            }}>
                            Login
                        </Button>
                        <Text
                            as={'span'}
                            color={'gray.500'}
                            fontSize={'lg'}
                            mt={4}
                            display={"block"}>
                            Don't have an account?
                            <Link to="/signup" ><Text as={'span'} color="green.400" fontSize={'lg'} fontWeight={"700"}> Sign up</Text></Link>
                        </Text>
                    </Box>
                    form
                </Stack>
            </Container>
        </Box>
    );
}



export default LoginPage;