import { Box, Button, Heading, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';


const UserSocial = ({ form, setForm, handleSubmit }) => {

    const setField = (field, value) => {
        setForm({
            ...form,
            social_links: {
                ...form.social_links,
                [field]: value
            }

        })
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
                            onChange={(e) => setField('facebook_url', e.target.value)}
                            value={form.social_links.facebook_url}
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
                            placeholder="LinkedIn url"
                            bg={'gray.100'}
                            type="url"
                            pr='4.5rem'
                            border={0}
                            onChange={(e) => setField('linkedIn_url', e.target.value)}
                            value={form.social_links.linkedIn_url}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <InputRightComponent url="https://www.linkedin.com/">
                            <FaLinkedin fontSize={"18"} />
                        </InputRightComponent>
                    </InputGroup>
                    <InputGroup size='md'>
                        <Input
                            placeholder="Instagram url"
                            bg={'gray.100'}
                            type="url"
                            pr='4.5rem'
                            border={0}
                            onChange={(e) => setField('instagram_url', e.target.value)}
                            value={form.social_links.instagram_url}
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