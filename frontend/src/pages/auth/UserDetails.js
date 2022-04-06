import { Box, Button, Checkbox, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserDetails = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <>
            <Stack spacing={4}>
                <Heading
                    color={'gray.800'}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Join our community
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    A community where we strive to make the world a better place for everyone to live.
                </Text>
            </Stack>
            <Box as={'form'} mt={10}>
                <Stack spacing={4}>
                    <Input
                        placeholder="Name"
                        bg={'gray.100'}
                        border={0}
                        color={'gray.500'}
                        type="text"
                        _placeholder={{
                            color: 'gray.500',
                        }}
                    />
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
                    <Checkbox px="1" color={"black"} borderColor={"gray.500"} iconColor={"white"}>Remember me</Checkbox>
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
                    Sign up
                </Button>
                <Text
                    as={'span'}
                    color={'gray.500'}
                    fontSize={'lg'}
                    mt={4}
                    display={"block"}>
                    Already have an account?
                    <Link to="/login" ><Text as={'span'} color="green.400" fontSize={'lg'} fontWeight={"700"}> Login</Text></Link>
                </Text>
            </Box>
        </>
    )
}

export default UserDetails