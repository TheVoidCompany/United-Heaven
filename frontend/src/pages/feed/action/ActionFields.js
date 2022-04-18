import {
    Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, InputGroup, Switch, Text, Textarea,
    useColorModeValue
} from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteTag
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './datePicker.css';



const sdgGoalNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];

const defaultFormFields = {
    title: '',
    description: '',
    sdgGoals: [],
    sdgTargets: [],
    isOnline: false,
    startDate: new Date(),
    endDate: '',
    relatedUrl: '',
    location: '',
    coverPhotoFile: null

}

const ActionFields = ({ type }) => {

    //reference to input type file
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const errorToastId = 'error-toast';
    const successToastId = 'success-toast';
    const [form, setForm] = useState(defaultFormFields);
    const [submitted, setSubmitted] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const imageUploadBg = useColorModeValue('gray.100', 'gray.800');
    const [allTargets, setAllTargets] = useState([]);
    const [targets, setTargets] = useState([]);


    useEffect(() => {
        fetch('https://unstats.un.org/sdgapi/v1/sdg/Target/List?includechildren=false')
            .then(res => res.json())
            .then(data => {
                setAllTargets(data);
            })
    }, []);


    useEffect(() => {

        //if sdgGoals changes, loop through allTargets and add targets to targets state where goal is in sdgGoals array
        if (form.sdgGoals.length > 0 && allTargets.length > 0) {
            let newTargets = [];
            allTargets.forEach(target => {
                if (form.sdgGoals.includes(target.goal)) {
                    newTargets.push(target);
                }
            }
            );
            setTargets(newTargets);
        }
        else {
            setTargets([]);
        }
    }, [form.sdgGoals, allTargets]);

    useLayoutEffect(() => {
        if (type === 'edit') {
            setForm(defaultFormFields);
        }
    }, [type])




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
                <AutoComplete openOnFocus multiple onChange={(e) => setField('sdgGoals', e)}>
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


            <FormControl id="sdgTargets" align={"start"}>
                <FormLabel mb="4">Related SDG Targets</FormLabel>
                <AutoComplete openOnFocus multiple onChange={(e) => setField('sdgTargets', e)}>
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
                {type === 'edit' ? "Edit Action" : "Publish Action"}
            </Button>
        </>
    )
}

export default ActionFields