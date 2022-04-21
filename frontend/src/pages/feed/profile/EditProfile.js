import {
    Avatar, Box, Button, Flex, FormControl, FormErrorMessage, Heading, Input, Text, useToast
} from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import findFormErrors from '../../../helpers/findFormErrors';
import DefaultDP from '../../../images/defaultDP.jpeg';
import { updateUserDetails, updateUserProfile } from '../../../services/UserService';

const EditProfile = () => {

    const { currentUser } = useContext(UserContext);
    const fileInputRef = useRef();
    const [form, setForm] = useState({
        name: currentUser.name,
        email: currentUser.email,
        social_links: currentUser.social_links,
    });
    const [imgUrl, setImgUrl] = useState(currentUser.image_url);
    const [dpData, setDpData] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

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

    const handleImage = (imageFile) => {
        setDpData(imageFile);
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
            setImgUrl(reader.result);
        };
    }

    const handleSubmit = async () => {
        const newErrors = findFormErrors(form)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            // if form is same as current user, don't make a request to the server:
            if (JSON.stringify(form) !== JSON.stringify({
                name: currentUser.name,
                email: currentUser.email,
                social_links: currentUser.social_links,
            })) {
                // make request to server:
                setLoading(true);
                const response = await updateUserDetails(currentUser.user_id, form);
                if (response.status === 200) {
                    if (dpData === null) {
                        setLoading(false);
                        navigate('/feed/profile');
                    }
                } else {
                    setLoading(false);
                    toast({
                        title: `Something went wrong`,
                        status: "error",
                        duration: 6000,
                    })
                }
            }

            if (dpData !== null) {
                setLoading(true);
                const formData = new FormData();
                formData.append('file', dpData);
                const response = await updateUserProfile(currentUser.user_id, formData);
                if (response.status === 200) {
                    setLoading(false);
                    navigate('/feed/profile');
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
    }

    return (
        <Flex width="100%" direction="column" mt="50px" px={{ base: "5%", md: "10%" }}>

            <Box>
                <Heading as="h1" size="lg">Edit Profile</Heading>
                <Text>Update your photos and personal details here</Text>
            </Box>
            <Box px={{ base: "0%", md: "10%" }} mt="10">
                <Flex py="8" mb="6" direction={"column-reverse"} align="center">
                    <Box textAlign={"center"} mt="3">
                        <Text
                            fontWeight="bold"
                        >Display Picture</Text>
                        <Text

                        >Click the display picture to chooose the new profile</Text>
                    </Box>

                    <Avatar
                        cursor="pointer"
                        src={imgUrl}
                        fallbackSrc={DefaultDP}
                        bg="gray.400"
                        _hover={{ bg: "gray" }}
                        size="2xl"
                        onClick={() => fileInputRef.current.click()}
                    />
                    <Input
                        display="none"
                        ref={fileInputRef}
                        disabled={loading}
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(event) => {
                            handleImage(event.target.files[0])
                        }}
                    />
                </Flex>
                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Name</Text>
                    <FormControl w="60%" id="name" isRequired isInvalid={!!errors['name']}>
                        <Input
                            placeholder='Enter name'
                            variant="filled"
                            onChange={(e) => setField('name', e.target.value)}
                            value={form.name}
                            disabled={loading}
                            type="text"
                        />
                        <FormErrorMessage>{errors['name']}</FormErrorMessage>
                    </FormControl>
                </Flex>

                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Email</Text>
                    <FormControl w="60%" id="email" isRequired isInvalid={!!errors['email']}>
                        <Input
                            placeholder='Email id'
                            variant="filled"
                            disabled={loading}
                            onChange={(e) => setField('email', e.target.value)}
                            value={form.email}
                            type="text"
                        />
                        <FormErrorMessage>{errors['email']}</FormErrorMessage>
                    </FormControl>
                </Flex>

                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >LinkedIn Url</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter LinkedIn url'
                        disabled={loading}
                        w="60%"
                        value={form.social_links?.linkedIn_url}
                        onChange={(e) => setField('social_links.linkedIn_url', e.target.value)}
                    />
                </Flex>
                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Facebook Url</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter facebook url'
                        disabled={loading}
                        value={form.social_links?.facebook_url}
                        onChange={(e) => setField('social_links.facebook_url', e.target.value)}
                        w="60%"

                    />
                </Flex>

                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Instagram Url</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter instagram url'
                        disabled={loading}
                        value={form.social_links?.instagram_url}
                        onChange={(e) => setField('social_links.instagram_url', e.target.value)}
                        w="60%"
                    />
                </Flex>


                <Flex my="8" justify="flex-end">
                    <Button
                        variant="solid"
                        colorScheme='teal'
                        onClick={handleSubmit}
                        isLoading={loading}
                        loadingText='Submitting'
                        _focus={{
                            boxShadow: '0 0 1px 1px #cccccc',
                        }}
                    >
                        Save Changes
                    </Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default EditProfile


