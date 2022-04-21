import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import ActionFooterButton from '../../../components/ActionFooterButton';
import FeedCard from "../../../components/cards/FeedCard";
import { UserContext } from '../../../context/userContext';
import { getActionDetails, getRecommendedActions } from '../../../services/ActionService';
import NotFound from '../../NotFound';

const Action = () => {

    const params = useParams();
    const actionId = params.id;

    //get filter params from url query
    const [searchParams] = useSearchParams();
    const { currentUser } = useContext(UserContext);
    const goalFilter = searchParams.get('goal');
    const [actions, setActions] = useState([]);
    const [noAction, setNoAction] = useState(false);



    useEffect(() => {
        if (!actionId) {
            getRecommendedActions(currentUser.user_id, goalFilter).then(response => {
                setActions(response.data);
            }).catch(error => {
                console.log(error);
            }
            );
        }
    }, [actionId, currentUser.user_id, goalFilter])



    useEffect(() => {
        if (actionId) {
            getActionDetails(actionId).then(response => {
                setActions([response.data]);
            }).catch(error => {
                setNoAction(true);
            }
            );
        }
    }, [actionId]);


    if (noAction) {
        return <NotFound />
    }

    return (
        <div>
            {actions.map(action => (
                <FeedCard
                    key={action.action_id}
                    profile={{
                        userId: 2,
                        imageUrl: 'https://avatars0.githubusercontent.com/u/1164541?v=4',
                        name: 'Achim Rolle',
                        subText: 'Feb 08, 2021 · 6min read',
                    }}
                    type="action"
                    heading={action.title}
                    image={action.image_url}
                    para={action.description}
                    startDate={action.start_date}
                    endDate={action.end_date}
                    isOnline={action.is_online}
                    location={action.location}
                    url={action.online_action_url}
                    sdgGoals={action.goals}
                    sdgTargets={action.targets}
                    clickableCardUrl={`/feed/actions/${action.action_id}`}
                    footer={<ActionFooterButton creatorId={action.creator} actionId={action.action_id} />}
                />
            ))}
        </div>
    )
}


export default Action