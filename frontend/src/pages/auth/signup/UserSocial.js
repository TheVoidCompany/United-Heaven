import { Box, Button, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';

const defaultFormFields = {
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
};

const UserSocial = () => {

    const [form, setForm] = useState(defaultFormFields);
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSubmit = (e) => {
        setCurrentUser({
            ...currentUser,
            ...form
        });
        navigate('/feed');
    }


    return (
        <>
            <Stack spacing={4}>
                <Heading
                    color={'gray.800'}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Connect your social account
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Help others to connect with you on social media platforms.
                </Text>
            </Stack>
            <Box as={'form'} mt={10}>
                <Stack spacing={6}>
                    <InputGroup size='md'>
                        <Input
                            placeholder="Facebook url"
                            bg={'gray.100'}
                            type="url"
                            pr='4.5rem'
                            border={0}
                            onChange={(e) => setField('facebookUrl', e.target.value)}
                            value={form.facebookUrl}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <InputRightComponent url="https://www.facebook.com/">
                            <FaFacebook fontSize={"18"} />
                        </InputRightComponent>
                    </InputGroup>
                    <InputGroup size='md'>
                        <Input
                            placeholder="Twitter url"
                            bg={'gray.100'}
                            type="url"
                            pr='4.5rem'
                            border={0}
                            onChange={(e) => setField('twitterUrl', e.target.value)}
                            value={form.twitterUrl}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <InputRightComponent url="https://twitter.com/">
                            <FaTwitter fontSize={"18"} />
                        </InputRightComponent>
                    </InputGroup>
                    <InputGroup size='md'>
                        <Input
                            placeholder="Instagram url"
                            bg={'gray.100'}
                            type="url"
                            pr='4.5rem'
                            border={0}
                            onChange={(e) => setField('instagramUrl', e.target.value)}
                            value={form.instagramUrl}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <InputRightComponent url="https://www.instagram.com/">
                            <FaInstagram fontSize={"18"} />
                        </InputRightComponent>
                    </InputGroup>
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
                    Finish
                </Button>
            </Box>
        </>
    )
}

const InputRightComponent = ({ children, url }) => {

    const handleSocialIconClick = (url) => {

        window.open(url, '_blank');

    }


    return (
        <InputRightElement width='4.5rem'>
            <Button onClick={() => handleSocialIconClick(url)} h='1.75rem' size='sm' color="black" _focus={{ outline: 0 }}>
                {children}
            </Button>
        </InputRightElement>
    )
}


export default UserSocial