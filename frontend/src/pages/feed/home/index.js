import { Box } from "@chakra-ui/react";
import FeedCard from "../../../components/cards/FeedCard";
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
                <FeedCard
                    profile={{
                        imageUrl: 'https://avatars0.githubusercontent.com/u/1164541?v=4',
                        name: 'Achim Rolle',
                        subText: 'Feb 08, 2021 · 6min read',
                    }}
                    type="action"
                    heading="Clean Marina Beach on 12 dec morning"
                    image='https://img.dtnext.in/Images/Article/201606010143032596_When-angels-come-to-clean-Marina-Beach_SECVPF.gif'
                    para="Marina beach is the second largest beach in the world and it is not maintained properly. The beach is full of litters and it's affecting everyone. So me and my friends are planning to clean the beach this sunday. Any one interested can join!!"
                    sdgTags={[1, 4, 6, 15, 17]}
                    buttonText="Participate"
                    buttonOnClick={() => {
                        console.log('join clicked')
                    }}
                />
                <FeedCard
                    type="news"
                    heading="12 students started environment campaign in south india"
                    image='https://avatars0.githubusercontent.com/u/1164541?v=4'
                />
                <FeedCard
                    type="event"
                    heading="UN SDG Action Campaign"
                    image='https://www2.sdgactioncampaign.org/wp-content/uploads/2017/08/IMG_3905.jpg'
                    sdgTags={[1, 4]}
                />
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