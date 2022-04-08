import { Box, Button, Checkbox, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const UserLoginDetails = ({ onSignupClick }) => {


    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const handleSubmit = () => {
        console.log("logged")
    }

    return (
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
                    onClick={handleSubmit}
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
                    <Text cursor={"pointer"} as={'span'} color="green.400" fontSize={'lg'} fontWeight={"700"} onClick={onSignupClick}> Sign up</Text>
                </Text>
            </Box>
        </Stack>
    )
}

export default UserLoginDetails