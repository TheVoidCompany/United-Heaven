import { Box, Flex, Heading } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router';
import ColumnCard from '../../../components/cards/ColumnCard';

const ViewAction = () => {

    const params = useParams();
    const userId = params.id;
    const url = useLocation().pathname;
    const type = url.includes('registered_actions') ? 'Registered Actions' : 'Actions';

    return (
        <Flex width="100%" direction="column" pt="50px" px={{ base: "5%", md: "10%" }}>
            <Heading mb="10" size="lg">{`${userId ? "santhosh's" : "Your"} ${type}`}</Heading>
            <Box>
                <SuggestedActionColumn />
            </Box>
        </Flex>
    )
}


const SuggestedActionColumn = () => {
    return (
        <Box>
            <ColumnCard
                type="action"
                heading="Clean Marina Beach on 12 dec morning"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/1'
            />
            <ColumnCard
                type="action"
                heading="12 students started environment campaign in south india"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/2'
            />
            <ColumnCard
                type="action"
                heading="Teach young students of africa about the importance of computer science in the modern world"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/3'
            />
            <ColumnCard
                type="action"
                heading="Global SDG conference is happening in california, US"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/1'
            />

        </Box>
    )
}

export default ViewAction