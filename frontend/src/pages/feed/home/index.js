import FeedCard from "../../../components/cards/FeedCard";

const Home = () => {
    return (
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
                sdgGoals={[1, 4, 6, 15, 17]}
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
    )
}

export default Home