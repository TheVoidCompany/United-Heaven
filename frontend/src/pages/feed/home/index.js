import { Box } from "@chakra-ui/react";
import ActionCard from "../../../components/cards/ActionCard";
import SDGFollowCard from "../../../components/cards/SDGFollowCard";
import TrendingCard from "../../../components/cards/TrendingCard";
import Heading from "../../../components/common/Heading";
import ThreeColumnStructure from "../../../components/ThreeColumnStructure";

const Home = () => {
    return (
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
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
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
    )
}

export default Home