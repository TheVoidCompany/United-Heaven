import { Box, Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import ColumnCard from '../../components/cards/ColumnCard';
import SDGFollowCard from '../../components/cards/SDGFollowCard';
import Heading from '../../components/common/Heading';
import FeedFilter from '../../components/FeedFilter';
import FeedNavbar from '../../components/navbar/FeedNavbar';
import ThreeColumnStructure from '../../components/ThreeColumnStructure';

const Feed = () => {

    const isLgScreen = useBreakpointValue({ base: false, lg: true })
    const bg = useColorModeValue('white', 'gray.900')
    const location = useLocation();
    const url = location.pathname;
    const feedSubUrl = url.slice(5);
    //check if feedSubUrl is '/goals/' + number and if so, set the goalId to the number
    const goalId = feedSubUrl.includes('/goals/') ? feedSubUrl.slice(7) ? feedSubUrl.slice(7) : null : null;
    //check if feedSubUrl is '/actions/' + number and if so, set the actionId to the number
    const actionId = feedSubUrl.includes('/actions/') ? feedSubUrl.slice(9) ? feedSubUrl.slice(9) : null : null;



    return (
        <Box bg={bg}>
            <Box w='100vw' minH='8vh' >
                <FeedNavbar />
            </Box>
            <Box w='100vw' minH='84vh' paddingX={goalId ? 0 : { base: '0%', '2xl': '8%' }}>
                {url.includes("/goals") || url.includes('/profile') || url === "/feed/actions/create" ? (
                    <Outlet />
                ) : (
                    <ThreeColumnStructure>
                        {isLgScreen ? (
                            url.slice(6).includes("actions") ? <SuggestedActionColumn /> : <SDGFollowColumn />
                        ) : (
                            <TrendingColumnWithSearch actionId={actionId} />
                        )}
                        <Box>
                            <Outlet />
                        </Box>
                        <TrendingColumnWithSearch actionId={actionId} />
                    </ThreeColumnStructure>
                )}

            </Box>
        </Box>
    )
}

const TrendingColumnWithSearch = ({ actionId }) => {
    return (
        <Box>
            <Flex
                h="60px"
                p="2" px="4" align={"center"}
            >
                {/* <SearchBar1 /> */}
                {!actionId && <FeedFilter />}

            </Flex>
            <TrendingColumn />
        </Box>
    )
}


const SDGFollowColumn = () => {
    return (
        <Box>
            <Heading
                customStyles={{ p: 4 }}
            >SDG Goals
            </Heading>
            <SDGFollowCard goalId={1} />
            <SDGFollowCard goalId={4} />
            <SDGFollowCard goalId={10} />
            <SDGFollowCard goalId={17} />
        </Box>
    )
}


const SuggestedActionColumn = () => {
    return (
        <Box>
            <Heading
                customStyles={{ p: 4 }}
            >Action</Heading>
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
                clickableCardUrl='/feed/actions/1'
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
                clickableCardUrl='/feed/actions/2'
            />

        </Box>
    )
}


const TrendingColumn = () => {
    return (

        <Box>
            <Heading
                customStyles={{ p: 4 }}
            >Trending</Heading>
            <ColumnCard
                type="action"
                heading="Clean Marina Beach on 12 dec morning"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/2'
            />
            <ColumnCard
                type="news"
                heading="12 students started environment campaign in south india"
                image='https://picsum.photos/200/200'
                clickableCardUrl='https://sdgs.un.org/news/call-inputs-global-sustainable-development-report-2023-34347'
            />
            <ColumnCard
                type="action"
                heading="Teach young students of africa about the importance of computer science in the modern world"
                image='https://picsum.photos/200/200'
                clickableCardUrl='/feed/actions/1'
            />
            <ColumnCard
                type="event"
                heading="Global SDG conference is happening in california, US"
                image='https://picsum.photos/200/200'
                clickableCardUrl='https://sdgs.un.org/events/online-regional-capacity-building-workshop-latin-america-and-caribbean-juncao-technology-and'
            />

        </Box>
    )
}

export default Feed