import { Button, HStack, Image, Spacer, useColorModeValue, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SDGGoals } from '../../constants/SDGGoals';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import { followGoal, unFollowGoal } from '../../services/GoalService';
import Heading from '../common/Heading';
import SDGTags from '../SDGTags';

const SDGFollowCard = ({ goalId = 1 }) => {

    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { onAuthRun } = useContext(AuthContext);


    useEffect(() => {
        if (currentUser.user_id) {
            const isFollowingGoal = currentUser.following_goals.find(goal => goal === goalId);
            if (isFollowingGoal) {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
        }
    }, [currentUser, goalId]);

    const handleFollow = (event) => {
        event.stopPropagation();
        onAuthRun(async () => {
            setIsFollowing(true);
            try {
                await followGoal(goalId, currentUser.user_id);
                setCurrentUser({
                    ...currentUser,
                    following_goals: [...currentUser.following_goals, goalId]
                });
            } catch (error) {
                setIsFollowing(false);
            }
        });
    }

    const handleUnFollow = (event) => {
        event.stopPropagation();
        onAuthRun(async () => {
            setIsFollowing(false);
            try {
                await unFollowGoal(goalId, currentUser.user_id);
                setCurrentUser({
                    ...currentUser,
                    following_goals: currentUser.following_goals.filter(goal => goal !== goalId)
                });
            } catch (error) {
                setIsFollowing(true);
            }
        });
    }

    return (
        <HStack
            p="4"
            cursor='pointer'
            onClick={() => navigate(`/feed/goals/${goalId}`)}
            _hover={{
                backgroundColor: useColorModeValue('gray.100', 'gray.800'),
            }}>
            <Image
                boxSize='80px'
                src={require(`../../images/SDGIcons/Goal${goalId}.png`)}
                mr="1"
            />
            <VStack
                alignItems="flex-start"
                spacing="1px"
                ml="2"
                maxW={40}
            >
                <Heading
                    size="lg"
                    customStyles={{ noOfLines: 3, mb: 1 }}
                >
                    {SDGGoals[goalId - 1].name}
                </Heading>
                <SDGTags
                    goals={[goalId]}
                />

            </VStack>
            <Spacer />
            <Button
                colorScheme='gray'
                variant='outline'
                size="sm"
                onClick={isFollowing ? handleUnFollow : handleFollow}
                _focus={{
                    outline: 'none',
                }}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
        </HStack>
    )
}

export default SDGFollowCard