import {
    Box, Container, Flex, Heading, Stack, Text
} from '@chakra-ui/react';
import "react-datepicker/dist/react-datepicker.css";
import ActionFields from './ActionFields';
import './datePicker.css';



const CreateAction = () => {

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
                    <ActionFields type="create" />
                </Stack>
            </Container>
        </Flex>

    )
}

export default CreateAction