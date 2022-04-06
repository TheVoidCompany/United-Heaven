import { useParams } from 'react-router';
import FeedCard from "../../../components/cards/FeedCard";
import { FakeActions } from "../../../data/FakeActions";

const Action = () => {

    const params = useParams();
    const actionId = params.id;

    const actions = actionId ? FakeActions.filter(action => {
        return action.id.toString() === actionId
    }) : FakeActions;


    return (
        <div>
            {actions.map(action => (
                <FeedCard
                    key={action.id}
                    profile={{
                        userId: 2,
                        imageUrl: 'https://avatars0.githubusercontent.com/u/1164541?v=4',
                        name: 'Achim Rolle',
                        subText: 'Feb 08, 2021 · 6min read',
                        followingGoals: [1, 4, 6, 15, 17],
                        socialLinks: [
                            {
                                website: 'twitter',
                                url: 'https://twitter.com/achimrolle'
                            },
                            {
                                website: 'facebook',
                                url: 'https://www.facebook.com/achimrolle'
                            },
                            {
                                website: 'instagram',
                                url: 'https://www.instagram.com/achimrolle'
                            },
                        ]
                    }}
                    type="action"
                    heading="Clean Marina Beach on 12 dec morning"
                    image='https://img.dtnext.in/Images/Article/201606010143032596_When-angels-come-to-clean-Marina-Beach_SECVPF.gif'
                    para="Marina beach is the second largest beach in the world and it is not maintained properly. The beach is full of litters and it's affecting everyone. So me and my friends are planning to clean the beach this sunday. Any one interested can join!!"
                    sdgGoals={[1, 4, 6, 15, 17]}
                    clickableCardUrl='/feed/actions/1'
                    buttonText="Participate"
                    buttonOnClick={() => {
                        console.log('join clicked')
                    }}
                />
            ))}
        </div>
    )
}

export default Action