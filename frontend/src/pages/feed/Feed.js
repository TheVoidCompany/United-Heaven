import { Box, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SDGFollowCard from '../../components/cards/SDGFollowCard';
import TrendingCard from '../../components/cards/TrendingCard';
import Heading from '../../components/common/Heading';
import FeedNavbar from '../../components/navbar/FeedNavbar';
import ThreeColumnStructure from '../../components/ThreeColumnStructure';

const Feed = () => {
    return (
        <Box bg={useColorModeValue('white', 'gray.900')}>
            <Box w='100vw' minH='8vh' >
                <FeedNavbar />
            </Box>
            <Box w='100vw' minH='84vh' paddingX={{ base: '0%', '2xl': '8%' }}>
                <ThreeColumnStructure>
                    <div>
                        <Heading
                            customStyles={{ p: 4 }}
                        >SDG Goals
                        </Heading>
                        <SDGFollowCard goalId={1} />
                        <SDGFollowCard goalId={4} />
                        <SDGFollowCard goalId={10} />
                        <SDGFollowCard goalId={17} />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                    <Box>
                        <Heading
                            customStyles={{ p: 4 }}
                        >Trending</Heading>
                        <TrendingCard
                            type="action"
                            heading="Clean Marina Beach on 12 dec morning"
                            image='https://picsum.photos/200/200'
                        />
                        <TrendingCard
                            type="news"
                            heading="12 students started environment campaign in south india"
                            image='https://picsum.photos/200/200'
                        />
                        <TrendingCard
                            type="action"
                            heading="Teach young students of africa about the importance of computer science in the modern world"
                            image='https://picsum.photos/200/200'
                        />
                        <TrendingCard
                            type="event"
                            heading="Global SDG conference is happening in california, US"
                            image='https://picsum.photos/200/200'
                        />

                    </Box>
                </ThreeColumnStructure>
            </Box>
        </Box>
    )
}

export default Feed