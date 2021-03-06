import { useSearchParams } from 'react-router-dom';
import ActionFooterButton from '../../../components/ActionFooterButton';
import FeedCard from "../../../components/cards/FeedCard";

const Home = () => {

    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const goalFilter = searchParams.get('goal');


    return (
        <div>
            <FeedCard
                profile={{
                    userId: 2,
                    imageUrl: 'https://avatars0.githubusercontent.com/u/1164541?v=4',
                    name: 'Achim Rolle',
                    subText: 'Feb 08, 2021 · 6min read',
                }}
                type="action"
                heading="Clean Marina Beach on 12 dec morning"
                image='https://img.dtnext.in/Images/Article/201606010143032596_When-angels-come-to-clean-Marina-Beach_SECVPF.gif'
                para="Marina beach is the second largest beach in the world and it is not maintained properly. The beach is full of litters and it's affecting everyone. So me and my friends are planning to clean the beach this sunday. Any one interested can join!!"
                sdgGoals={[1, 4, 6, 15, 17]}
                location="Marina Beach, chennai, IN"
                startDate="Feb 08, 2021"
                endDate="Feb 10, 2021"
                clickableCardUrl='/feed/actions/1'
                footer={<ActionFooterButton />}
            />
            <FeedCard
                type="event"
                heading="ECOSOC Humanitarian Affairs Segment 2022"
                image='http://hub.iisd.org/wp-content/uploads/2021/09/cg-951.jpg'
                sdgTags={[1, 4]}
                clickableCardUrl='https://sdg.iisd.org/events/ecosoc-humanitarian-affairs-segment-2022/'
            />
            <FeedCard
                type="news"
                heading="Five Countries Yet to Conduct Voluntary National Review"
                image='https://sdg.iisd.org/wp-content/uploads/2019/09/cg-405.jpg'
                clickableCardUrl='https://sdg.iisd.org/news/five-countries-yet-to-conduct-voluntary-national-review/'
            />
            <FeedCard
                type="event"
                heading="World Maritime Day 2022"
                image='http://hub.iisd.org/wp-content/uploads/2016/11/cg-104.jpg'
                sdgTags={[1, 4]}
                clickableCardUrl='https://sdg.iisd.org/events/world-maritime-day-2022/'
            />
        </div>
    )
}

export default Home