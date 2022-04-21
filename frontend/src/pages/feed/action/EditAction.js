import {
    Box, Container, Flex, Heading, Stack, Text
} from '@chakra-ui/react';
import { useContext } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import ActionFields from './ActionFields';
import './datePicker.css';


const EditAction = () => {

    const params = useParams();
    const actionId = params.id;
    const { currentUser } = useContext(UserContext);

    // get current users actions and check if actionId is in it or else show not found page

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
                        Edit {" "}
                        <Text as={'span'} color={'green.400'}>
                            Action
                        </Text>
                    </Heading>
                    <ActionFields type="edit" actionId={actionId} />
                </Stack>
            </Container>
        </Flex>

    )
}

export default EditAction