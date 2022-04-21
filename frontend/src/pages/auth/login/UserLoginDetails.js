import {
    Box, Button, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputRightElement, Stack, Text, useToast
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/common/LoadingScreen';
import { UserContext } from '../../../context/userContext';
import findFormErrors from '../../../helpers/findFormErrors';
import { loginUser } from '../../../services/UserService';

const defaultFormFields = {
    email: '',
    password: '',
}

const UserLoginDetails = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [form, setForm] = useState(defaultFormFields);
    const [errors, setErrors] = useState({});
    const handleClick = () => setShow(!show);
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useContext(UserContext);
    const toast = useToast();

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })

    }

    const handleSubmit = async (e) => {
        const newErrors = findFormErrors(form)

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setLoading(true);
            const response = await loginUser(form);

            if (response.status === 200) {
                setCurrentUser(response.data);
                setLoading(false);
                navigate('/feed');
            } else if (response.status === 401) {
                setLoading(false);
                toast({
                    title: `Email or password is incorrect`,
                    status: "error",
                    duration: 6000,
                })
            } else {
                setLoading(false);
                toast({
                    title: `Something went wrong`,
                    status: "error",
                    duration: 6000,
                })
            }

        }
    }



    const onSignupClick = () => {
        navigate('/signup');
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
            {loading ? <LoadingScreen size="xl" color={"black"} /> : (
                <Box as={'form'} mt={10}>
                    <Stack spacing={4}>
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
                        </FormControl>
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
            )}
        </Stack>
    )
}

export default UserLoginDetails