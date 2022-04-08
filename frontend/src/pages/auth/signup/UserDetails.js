import { Box, Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import findFormErrors from '../../../helpers/findFormErrors';


const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    remember: false,
};

const UserDetails = ({ goNext, onLoginClick }) => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [form, setForm] = useState(defaultFormFields);
    const [errors, setErrors] = useState({});


    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = (e) => {
        const newErrors = findFormErrors(form)

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            goNext();
        }
    }


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
                    <FormControl id="name" isRequired isInvalid={!!errors['name']}>
                        <Input
                            placeholder="Name"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            onChange={(e) => setField('name', e.target.value)}
                            value={form.name}
                            type="text"
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <FormErrorMessage>{errors['name']}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="email" isRequired isInvalid={!!errors['email']}>
                        <Input
                            placeholder="Email Id"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            onChange={(e) => setField('email', e.target.value)}
                            value={form.email}
                            type="email"
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <FormErrorMessage>{errors['email']}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="password" isRequired isInvalid={!!errors['password']}>
                        <InputGroup size='md'>
                            <Input
                                placeholder="Password"
                                bg={'gray.100'}
                                pr='4.5rem'
                                border={0}
                                type={show ? 'text' : 'password'}
                                onChange={(e) => setField('password', e.target.value)}
                                value={form.password}
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
                        <FormErrorMessage>{errors['password']}</FormErrorMessage>
                        <FormHelperText px={1} color={'gray.500'}>Your password must be atleast 8 characters long, contain letters and numbers</FormHelperText>
                    </FormControl>

                    <Checkbox
                        px="1"
                        color={"black"}
                        borderColor={"gray.500"}
                        iconColor={"white"}
                        value={form.remember}
                        onChange={(e) => setField('remember', !form.remember)}
                    >Remember me</Checkbox>
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
                    Sign up
                </Button>
                <Text
                    as={'span'}
                    color={'gray.500'}
                    fontSize={'lg'}
                    mt={4}
                    display={"block"}>
                    Already have an account?
                    <Text cursor={"pointer"} as={'span'} color="green.400" fontSize={'lg'} fontWeight={"700"} onClick={onLoginClick}> Login</Text>
                </Text>
            </Box>
        </>
    )
}

export default UserDetails