import {
    Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, InputGroup, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Stack, Switch, Tag, TagCloseButton, TagLabel, Text, Textarea,
    useColorModeValue, Wrap, WrapItem
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './datePicker.css';

const sdgGoalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const defaultFormFields = {
    title: '',
    description: '',
    sdgGoals: [],
    isOnline: false,
    startDate: new Date(),
    endDate: '',
    relatedUrl: '',
    location: '',
    coverPhotoFile: null

}


const CreateAction = () => {

    //reference to input type file
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const errorToastId = 'error-toast';
    const successToastId = 'success-toast';
    const [form, setForm] = useState(defaultFormFields);
    const [submitted, setSubmitted] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const tagBg = useColorModeValue('#EEF2F6', '#20222B');
    const imageUploadBg = useColorModeValue('gray.100', 'gray.800');

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        //check if all fields are filled in correctly
        if (form.title === '' || form.description === '' || form.sdgGoals.length === 0 || form.endDate === '' || form.coverPhotoFile === null) {
            return;
        }
    }

    const handleImage = (fileData) => {
        setField('coverPhotoFile', fileData);

        //get image url from file data
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = () => {
            setImgUrl(reader.result);
        }
    }


    const handleSdgGoalsRemove = (sdgGoal) => {
        setField('sdgGoals', form.sdgGoals.filter(goal => goal !== sdgGoal))
    }




    return (
        <Flex direction={"column"} pt="10" align={"center"} pb={200}>

            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 30 }}

                >
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Save the world with <br />
                        <Text as={'span'} color={'green.400'}>
                            your actions
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Create an action to solve a SDG goal and share it with the United Heaven community to inspire others.
                        Allow others to participate in your action and help you achieve your goal.
                    </Text>
                    {imgUrl ? <Image src={imgUrl} alt="cover photo" onClick={() => fileInputRef.current.click()} /> : (
                        <>
                            <Flex
                                onClick={() => fileInputRef.current.click()}
                                cursor="pointer"
                                bg={imageUploadBg}
                                w="100%"
                                h="500px"
                                borderRadius="12px"
                                borderColor={submitted && form.coverPhotoFile === null ? "red.400" : imageUploadBg}
                                borderWidth={2}
                                align="center"
                                justify="center"
                                direction="column"
                                overflow="hidden"
                            >
                                <BsFillCloudUploadFill color="#B6C5E1" size="100" />
                                <Box color="#B6C5E1">
                                    <Heading mt="5">Select a cover photo</Heading>
                                    {submitted && form.coverPhotoFile === null && <Text color={"red.400"}>Image is required</Text>}
                                </Box>

                            </Flex>
                        </>
                    )}
                    <FormControl display="none">
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(event) => {
                                handleImage(event.target.files[0])
                            }}
                        />

                    </FormControl>
                    <FormControl id="title" isRequired isInvalid={submitted && form.title === ""}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="What is your action about?"
                            _placeholder={{ color: 'gray.500' }}
                            onChange={(e) => setField('title', e.target.value)}
                            value={form.title}
                            type="text"
                            variant='filled'
                            _focus={{
                                outline: 'none',
                            }}
                        />
                        <FormErrorMessage>Title is required</FormErrorMessage>
                    </FormControl>

                    <FormControl id="description" isRequired isInvalid={submitted && form.description === ""}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder='Enter detailed description of your action'
                            size='lg'
                            onChange={(e) => setField('description', e.target.value)}
                            value={form.description}
                            resize={'none'}
                            variant='filled'
                            h="200"
                            _focus={{
                                outline: 'none',
                            }}
                        />
                        <FormErrorMessage>Description is required</FormErrorMessage>
                    </FormControl>

                    <FormControl id="sdgGoals" isRequired align={"start"} isInvalid={submitted && form.sdgGoals.length === 0}>
                        <FormLabel mb="4">Related SDG Goals</FormLabel>

                        <Menu closeOnSelect={false} isLazy>
                            <MenuButton as={Button}
                                _focus={{
                                    outline: 'none',
                                }}
                            >
                                Choose goals
                            </MenuButton>
                            <MenuList minWidth='240px'>
                                <MenuOptionGroup value={form.sdgGoals} type='checkbox' onChange={(e) => setField('sdgGoals', e)}>
                                    {sdgGoalNumbers.map((goal, index) => (
                                        <MenuItemOption key={index} value={goal}>
                                            Goal {goal}
                                        </MenuItemOption>
                                    ))}
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        {form.sdgGoals.length > 0 && (
                            <Box mt={8} rounded={"lg"} p={10} bg={tagBg}>
                                <Wrap>
                                    {form.sdgGoals.map(goal => {
                                        return (
                                            <WrapItem key={goal}>
                                                <Tag
                                                    size={'md'}
                                                    borderRadius='full'
                                                    variant='solid'
                                                    mx={1}
                                                >
                                                    <TagLabel>Goal {goal}</TagLabel>
                                                    <TagCloseButton onClick={() => handleSdgGoalsRemove(goal)} />
                                                </Tag>
                                            </WrapItem>
                                        )
                                    })}
                                </Wrap>
                            </Box>
                        )}
                        <FormErrorMessage>SDG Goals are required</FormErrorMessage>
                    </FormControl>

                    <FormControl id="startDate" isRequired>
                        <FormLabel>Start Date</FormLabel>
                        <InputGroup className={useColorModeValue("light-theme", "dark-theme")}>
                            <Input
                                as={DatePicker}
                                placeholderText="Click to select date"
                                onChange={(e) => setField('startDate', e)}
                                selected={form.startDate}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showPopperArrow={false}
                                showTimeSelect
                                variant='filled'
                                _focus={{
                                    outline: 'none',
                                }}
                            />
                        </InputGroup>
                    </FormControl>



                    <FormControl id="endDate" isRequired isInvalid={submitted && form.endDate === ''}>
                        <FormLabel>End Date</FormLabel>
                        <InputGroup className={useColorModeValue("light-theme", "dark-theme")}>
                            <Input
                                as={DatePicker}
                                placeholderText="Click to select date"
                                onChange={(e) => setField('endDate', e)}
                                selected={form.endDate}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showPopperArrow={false}
                                showTimeSelect
                                variant='filled'
                                _focus={{
                                    outline: 'none',
                                }}
                            />
                        </InputGroup>
                        <FormErrorMessage>End date is required</FormErrorMessage>
                    </FormControl>



                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='isOnline' mb='0' fontSize={"lg"}>
                            Is this action online?
                        </FormLabel>
                        <Switch value={form.isOnline} colorScheme={"green"} size='lg' id='isOnline' onChange={(e) => setField('isOnline', !form.isOnline)} />
                    </FormControl>

                    {!form.isOnline && (
                        <FormControl id="location">
                            <FormLabel>Location</FormLabel>
                            <Input
                                placeholder="Enter location where the action is happening"
                                _placeholder={{ color: 'gray.500' }}
                                type="url"
                                onChange={(e) => setField('location', e.target.value)}
                                value={form.location}
                                _focus={{
                                    outline: 'none',
                                }}
                                variant='filled'
                            />
                        </FormControl>

                    )}

                    <FormControl id="url">
                        <FormLabel>Related url</FormLabel>
                        <Input
                            placeholder="Enter any url you want to provide to the users"
                            _placeholder={{ color: 'gray.500' }}
                            type="url"
                            onChange={(e) => setField('url', e.target.value)}
                            value={form.url}
                            _focus={{
                                outline: 'none',
                            }}
                            variant='filled'
                        />
                    </FormControl>

                    <Button
                        variant="solid"
                        bg='green.400'
                        type="submit"
                        color={"white"}
                        onClick={handleSubmit}
                        _focus={{
                            boxShadow: '0 0 1px 1px #cccccc',
                        }}
                    >
                        Publish Action
                    </Button>
                </Stack>
            </Container>
        </Flex>

    )
}

export default CreateAction