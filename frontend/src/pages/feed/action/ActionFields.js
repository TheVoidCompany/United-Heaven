import {
    Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, InputGroup, Switch, Text, Textarea,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteTag
} from "@choc-ui/chakra-autocomplete";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { createAction, getActionDetails, updateActionDetails, updateActionPicture } from '../../../services/ActionService';
import './datePicker.css';



const sdgGoalNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];

const defaultFormFields = {
    title: '',
    description: '',
    goals: [],
    targets: [],
    is_online: false,
    start_date: new Date(),
    end_date: '',
    online_action_url: '',
    location: ''

}

const ActionFields = ({ type, actionId }) => {

    const { currentUser } = useContext(UserContext);
    //reference to input type file
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const toast = useToast();
    const [form, setForm] = useState(defaultFormFields);
    const [submitted, setSubmitted] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [coverPhotoFile, setcoverPhotoFile] = useState(null);
    const imageUploadBg = useColorModeValue('gray.100', 'gray.800');
    const [allTargets, setAllTargets] = useState([]);
    const [targets, setTargets] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetch('https://unstats.un.org/sdgapi/v1/sdg/Target/List?includechildren=false')
            .then(res => res.json())
            .then(data => {
                setAllTargets(data);
            })
    }, []);


    useEffect(() => {

        //if goals changes, loop through allTargets and add targets to targets state where goal is in goals array
        if (form.goals.length > 0 && allTargets.length > 0) {
            let newTargets = [];
            allTargets.forEach(target => {
                if (form.goals.includes(target.goal)) {
                    newTargets.push(target);
                }
            }
            );
            setTargets(newTargets);
        }
        else {
            setTargets([]);
        }
    }, [form.goals, allTargets]);

    useLayoutEffect(() => {
        if (type === 'edit') {
            getActionDetails(actionId)
                .then(res => {
                    setImgUrl(res.data.image_url);
                    // remove image_url, action_id, creator from res before setting form
                    let newForm = { ...res.data };
                    delete newForm.image_url;
                    delete newForm.action_id;
                    delete newForm.creator;
                    setForm(newForm);
                })
                .catch(err => {
                    toast({
                        position: 'top-right',
                        title: 'Error loading action',
                        description: 'Please try again later',
                        status: 'error',
                        duration: 9000,
                    });
                })
        }
    }, [actionId, toast, type])




    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        async function postCoverPhoto() {
            if (coverPhotoFile !== null) {
                const formData = new FormData();
                formData.append('file', coverPhotoFile);
                const response = await updateActionPicture(actionId, formData);
                return response;
            }
        }

        function successToast() {
            toast({
                position: 'top-right',
                title: 'Action updated',
                description: 'Your action has been updated',
                status: 'success',
                duration: 6000,
            });
        }

        function errorToast() {
            toast({
                position: 'top-right',
                title: 'Error updating action',
                description: 'Please try again later',
                status: 'error',
                duration: 6000,
            });
        }

        //check if all fields are filled in correctly
        if (form.title === '' || form.description === '' ||
            form.goals.length === 0 || form.end_date === '' ||
            coverPhotoFile === null || (!form.is_online && form.location === '') || (form.is_online && form.online_action_url === '')) {
            return;
        } else {
            setLoading(true);
            let formData = { ...form };
            formData.creator = currentUser.user_id;
            formData.start_date = form.start_date.toISOString();
            formData.end_date = form.end_date.toISOString();
            if (type === "edit") {
                const response = await updateActionDetails(actionId, formData);
                if (response.status === 200) {
                    if (coverPhotoFile !== null) {
                        const coverPhotoResponse = await postCoverPhoto();
                        if (coverPhotoResponse.status === 200) {
                            successToast();
                            setLoading(false);
                            navigate('/actions');
                        }
                    } else {
                        successToast();
                        setLoading(false);
                        navigate('/actions');
                    }
                }
                else {
                    setLoading(false);
                    errorToast();
                }
            } else {
                const response = await createAction(formData);
                if (response.status === 200) {
                    const coverPhotoResponse = await postCoverPhoto();
                    if (coverPhotoResponse.status === 200) {
                        toast({
                            position: 'top-right',
                            title: 'Action created',
                            description: 'Your action has been created',
                            status: 'success',
                            duration: 6000,
                        });
                        setLoading(false);
                        navigate('/actions');
                    }
                }
                else {
                    setLoading(false);
                    errorToast();
                }
            }
        }
    }

    const handleImage = (fileData) => {
        setcoverPhotoFile(fileData);

        //get image url from file data
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = () => {
            setImgUrl(reader.result);
        }
    }

    return (
        <>
            {imgUrl ? <Image src={imgUrl} alt="cover photo" onClick={() => fileInputRef.current.click()} /> : (
                <>
                    <Flex
                        onClick={() => fileInputRef.current.click()}
                        cursor="pointer"
                        bg={imageUploadBg}
                        w="100%"
                        h="500px"
                        borderRadius="12px"
                        borderColor={submitted && coverPhotoFile === null ? "red.400" : imageUploadBg}
                        borderWidth={2}
                        align="center"
                        justify="center"
                        direction="column"
                        overflow="hidden"
                    >
                        <BsFillCloudUploadFill color="#B6C5E1" size="100" />
                        <Box color="#B6C5E1">
                            <Heading mt="5">Select a cover photo</Heading>
                            {submitted && coverPhotoFile === null && <Text color={"red.400"}>Image is required</Text>}
                        </Box>

                    </Flex>
                </>
            )}
            <FormControl display="none">
                <Input
                    ref={fileInputRef}
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                    resize={'none'}
                    variant='filled'
                    h="200"
                    _focus={{
                        outline: 'none',
                    }}
                />
                <FormErrorMessage>Description is required</FormErrorMessage>
            </FormControl>



            <FormControl id="goals" isRequired align={"start"} isInvalid={submitted && form.goals.length === 0}>
                <FormLabel mb="4">Related SDG Goals</FormLabel>
                <AutoComplete openOnFocus multiple onChange={(e) => setField('goals', e)}>
                    <AutoCompleteInput variant="filled">
                        {({ tags }) =>
                            tags.map((tag, tid) => (
                                <AutoCompleteTag
                                    key={tid}
                                    label={`Goal ${tag.label}`}
                                    onRemove={tag.onRemove}
                                />
                            ))
                        }
                    </AutoCompleteInput>
                    <AutoCompleteList>
                        {sdgGoalNumbers.map((goal) => (
                            <AutoCompleteItem
                                key={`option-${goal}`}
                                value={goal}
                                goal="capitalize"
                                disabled={loading}
                                _selected={{ bg: "whiteAlpha.50" }}
                                _focus={{ bg: "whiteAlpha.100" }}
                            >
                                Goal - {goal}
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
                <FormErrorMessage>SDG Goals are required</FormErrorMessage>
            </FormControl>


            <FormControl id="targets" align={"start"}>
                <FormLabel mb="4">Related SDG Targets</FormLabel>
                <AutoComplete openOnFocus multiple onChange={(e) => setField('targets', e)}>
                    <AutoCompleteInput variant="filled">
                        {({ tags }) =>
                            tags.map((tag, tid) => (
                                <AutoCompleteTag
                                    key={tid}
                                    label={`Target ${tag.label}`}
                                    onRemove={tag.onRemove}
                                />
                            ))
                        }
                    </AutoCompleteInput>
                    <AutoCompleteList>
                        {targets.map((target) => (
                            <AutoCompleteItem
                                key={`option-${target.code}`}
                                value={target.code}
                                disabled={loading}
                                goal="capitalize"
                                _selected={{ bg: "whiteAlpha.50" }}
                                _focus={{ bg: "whiteAlpha.100" }}
                            >
                                {target.code} - {target.title}
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
            </FormControl>




            <FormControl id="start_date" isRequired isInvalid={submitted && form.start_date === ''}>
                <FormLabel>Start Date</FormLabel>
                <InputGroup className={useColorModeValue("light-theme", "dark-theme")}>
                    <Input
                        as={DatePicker}
                        placeholderText="Click to select date"
                        onChange={(e) => setField('start_date', e)}
                        selected={form.start_date}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showPopperArrow={false}
                        disabled={loading}
                        showTimeSelect
                        variant='filled'
                        _focus={{
                            outline: 'none',
                        }}
                    />
                </InputGroup>
                <FormErrorMessage>Start date is required</FormErrorMessage>
            </FormControl>



            <FormControl id="end_date" isRequired isInvalid={submitted && form.end_date === ''}>
                <FormLabel>End Date</FormLabel>
                <InputGroup className={useColorModeValue("light-theme", "dark-theme")}>
                    <Input
                        as={DatePicker}
                        placeholderText="Click to select date"
                        onChange={(e) => setField('end_date', e)}
                        selected={form.end_date}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showPopperArrow={false}
                        disabled={loading}
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
                <FormLabel htmlFor='is_online' mb='0' fontSize={"lg"}>
                    Is this action online?
                </FormLabel>
                <Switch disabled={loading} value={form.is_online} colorScheme={"green"} size='lg' id='is_online' onChange={(e) => setField('is_online', !form.is_online)} />
            </FormControl>

            {!form.is_online ? (
                <FormControl id="location">
                    <FormLabel>Location</FormLabel>
                    <Input
                        placeholder="Enter location where the action is happening"
                        _placeholder={{ color: 'gray.500' }}
                        type="url"
                        onChange={(e) => setField('location', e.target.value)}
                        value={form.location}
                        disabled={loading}
                        _focus={{
                            outline: 'none',
                        }}
                        variant='filled'
                    />
                </FormControl>

            ) : (
                <FormControl id="url">
                    <FormLabel>Online url</FormLabel>
                    <Input
                        placeholder="Enter url where the action is happening"
                        _placeholder={{ color: 'gray.500' }}
                        type="url"
                        disabled={loading}
                        onChange={(e) => setField('online_action_url', e.target.value)}
                        value={form.online_action_url}
                        _focus={{
                            outline: 'none',
                        }}
                        variant='filled'
                    />
                </FormControl>
            )}



            <Button
                variant="solid"
                bg='green.400'
                type="submit"
                color={"white"}
                onClick={handleSubmit}
                isLoading={loading}
                loadingText='Submitting'
                _focus={{
                    boxShadow: '0 0 1px 1px #cccccc',
                }}
            >
                {type === 'edit' ? "Edit Action" : "Publish Action"}
            </Button>
        </>
    )
}

export default ActionFields