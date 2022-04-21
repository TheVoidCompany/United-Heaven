import { Box, Flex, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import ActionFooterButton from '../../../components/ActionFooterButton';
import ColumnCard from '../../../components/cards/ColumnCard';
import { UserContext } from '../../../context/userContext';

const ViewAction = () => {

    const params = useParams();
    const userId = params.id;
    const { currentUser } = useContext(UserContext);
    const url = useLocation().pathname;
    const type = url.includes('registered_actions') ? 'Registered Actions' : 'Actions';
    const ownProfile = (!params.id || currentUser.user_id === params.id) ? true : false;
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
                footer={<ActionFooterButton />}
            />
            <ColumnCard
                type="action"
                heading="12 students started environment campaign in south india"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/2'
                footer={<ActionFooterButton />}
            />
            <ColumnCard
                type="action"
                heading="Teach young students of africa about the importance of computer science in the modern world"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/3'
                footer={<ActionFooterButton />}
            />
            <ColumnCard
                type="action"
                heading="Global SDG conference is happening in california, US"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/1'
                footer={<ActionFooterButton />}
            />

        </Box>
    )
}


export default ViewAction