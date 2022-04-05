import { useParams } from 'react-router';

const GoalFeed = () => {

    const params = useParams();
    const goalId = params.id;

    return (
        <div>{goalId}</div>
    )
}

export default GoalFeed