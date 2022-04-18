import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router';
import ColumnCard from '../../../components/cards/ColumnCard';

const ViewAction = () => {

    const params = useParams();
    const userId = params.id;
    const url = useLocation().pathname;
    const type = url.includes('registered_actions') ? 'Registered Actions' : 'Actions';
    // const ownProfile = (!params.id || currentUserData.account_id === parseInt(params.id)) ? true : false;
    const ownProfile = userId ? false : true;
    return (
        <Flex width="100%" direction="column" pt="50px" px={{ base: "5%", md: "10%" }}>
            <Heading mb="10" size="lg">{`${userId ? "santhosh's" : "Your"} ${type}`}</Heading>
            <Box>
                <SuggestedActionColumn type={type} ownProfile={ownProfile} />
            </Box>
        </Flex>
    )
}


const SuggestedActionColumn = ({ type, ownProfile }) => {
    return (
        <Box>
            <ColumnCard
                type="action"
                heading="Clean Marina Beach on 12 dec morning"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/1'
                footer={ownProfile && <FooterButton type={type} />}
            />
            <ColumnCard
                type="action"
                heading="12 students started environment campaign in south india"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/2'
                footer={ownProfile && <FooterButton type={type} />}
            />
            <ColumnCard
                type="action"
                heading="Teach young students of africa about the importance of computer science in the modern world"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/3'
                footer={ownProfile && <FooterButton type={type} />}
            />
            <ColumnCard
                type="action"
                heading="Global SDG conference is happening in california, US"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/1'
                footer={ownProfile && <FooterButton type={type} />}
            />

        </Box>
    )
}

const FooterButton = ({ type }) => {

    return (
        <Flex>
            {type === 'Registered Actions' ? (
                <Button mr="4" size="sm">Unparticipate</Button>
            ) : (
                <>
                    <Button mr="4" size="sm">Edit Action</Button>
                    <Button size="sm" variant={"ghost"} colorScheme={"red"}>Delete Action</Button>
                </>
            )}
        </Flex>
    )
}

export default ViewAction