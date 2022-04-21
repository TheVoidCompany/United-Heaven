import {
    Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text, useBreakpointValue, useColorModeValue, VStack
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ColumnCard from '../../../components/cards/ColumnCard';
import StatisticsCard from '../../../components/cards/StatisticsCard';
import TargetAccordianCard from '../../../components/cards/TargetAccordianCard';
import Footer from '../../../components/common/Footer';
import { SDGGoals } from '../../../constants/SDGGoals';
import { AuthContext } from '../../../context/authContext';
import { UserContext } from '../../../context/userContext';
import { followGoal, unFollowGoal } from '../../../services/GoalService';

const GoalFeed = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { onAuthRun } = useContext(AuthContext);
    let goalId = params.id;

    const handleNextLink = () => {
        if (goalId === "17") {
            window.open('https://sdgs.un.org/goals', '_blank');
        } else {
            navigate(`/feed/goals/${++goalId}`);
        }
    }


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
        <Box>
            <Flex
                w={'full'}
                h={'60vh'}
                mt={'-1vh'}
                backgroundImage={require(`../../../images/SDGCovers/goalcover${goalId}.webp`)}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}>
                <VStack
                    w={'full'}
                    justify={'center'}
                    align={"start"}
                    paddingX={{ base: '4%', lg: "2%", '2xl': '8%' }}
                    bgGradient={`linear(to-r, ${SDGGoals[goalId - 1].color + 'CC'}, transparent)`}>
                    <Flex direction={"column"} maxW={'3xl'} align={'flex-start'} spacing={6} h="100%">
                        <Flex flex={1.2} align={"flex-end"} pb="6">
                            <Text
                                color={'#ffffff70'}
                                fontWeight={900}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '5xl', md: '6xl' })}>
                                {SDGGoals[goalId - 1].id}
                            </Text>
                        </Flex>
                        <Flex flex={2.2} align={"flex-start"}>
                            <Text
                                color={'white'}
                                fontWeight={800}
                                textShadow={'0px 0px 10px rgba(0,0,0,0.3)'}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '2xl', sm: '3xl', md: '4xl' })}
                                noOfLines={7}

                            >
                                {SDGGoals[goalId - 1].description}
                            </Text>
                        </Flex>
                        <Flex flex={0.6} align={"flex-end"} mb="10">
                            <Stack direction={'row'}>
                                <Button
                                    bg={'whiteAlpha.300'}
                                    rounded={'full'}
                                    color={'white'}
                                    disabled={goalId === "1"}
                                    _focus={{ outline: 'none' }}
                                    onClick={() => navigate(`/feed/goals/${--goalId}`)}
                                    _hover={{ bg: 'whiteAlpha.500' }}>
                                    Previous
                                </Button>
                                <Button
                                    bg={'whiteAlpha.300'}
                                    rounded={'full'}
                                    color={'white'}
                                    disabled={goalId === SDGGoals.length.toString()}
                                    _focus={{ outline: 'none' }}
                                    onClick={() => navigate(`/feed/goals/${++goalId}`)}
                                    _hover={{ bg: 'whiteAlpha.500' }}>
                                    Next
                                </Button>
                                <Text alignSelf={"center"} color={"white"}>-</Text>
                                {isFollowing ? (
                                    <Button
                                        bg={'whiteAlpha.300'}
                                        rounded={'full'}
                                        color={'white'}
                                        _focus={{ outline: 'none' }}
                                        onClick={handleUnFollow}
                                        _hover={{ bg: 'whiteAlpha.500' }}>
                                        Following
                                    </Button>
                                ) : (
                                    <Button
                                        rounded={'full'}
                                        color={'white'}
                                        variant={"solid"}
                                        bg={'blue.500'}
                                        _hover={{ bg: 'blue.600' }}
                                        _focus={{ outline: 'none' }}
                                        onClick={handleFollow}
                                    >
                                        Follow
                                    </Button>
                                )}

                            </Stack>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>
            <Box py={{ base: 20, lg: 40 }}>
                <StatisticsCard goalId={goalId} />
            </Box>
            <Box py={{ base: 10, lg: 30 }}>
                <Heading
                    pb={8}
                    pt={16}
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight={'500'}
                    fontFamily={'Oswald'}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    px={{ base: '4%', '2xl': '8%' }}
                >
                    TARGETS AND INDICATORS
                </Heading>
                {/* <Text
                    pb={6}
                    fontSize={'md'}
                    color={'gray.400'}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    px={{ base: '4%', '2xl': '8%' }}
                >
                    Targets and indicators sets the framework for the SDG.
                    Targets are the possible problems that need to be solved to address SDG goals.
                    Indicators are the actual measures that are taken to address the targets.
                    Targets and indicators changes every decade and are updated by the UN Statistics.
                </Text> */}
                <Box>
                    <TargetAccordianCard
                        goalId={goalId}
                    />
                </Box>
            </Box>
            <Box py={{ base: "80px", lg: "100px" }}>
                <Flex justify={"space-between"} pb={8} px={{ base: '4%', '2xl': '8%' }} align={"center"}>
                    <Heading
                        fontSize={{ base: '2xl', md: '3xl' }}
                        fontWeight={'500'}
                        fontFamily={'Oswald'}

                    >
                        RELATED TOPICS
                    </Heading>
                    <Button variant='outline' size={"lg"} onClick={() => navigate(`/feed?goal=${goalId}`)}>
                        View More
                    </Button>
                </Flex>
                <Box px={{ base: '0%', 'lg': '4%', '2xl': '8%' }}>
                    <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={6}>
                        <ColumnCard
                            type="action"
                            heading="Distributing free foods to people in need"
                            image='https://pbs.twimg.com/media/EB_L4EGXUAAq3sU.jpg'
                            clickableCardUrl='/feed/actions/1'
                        />
                        <ColumnCard
                            type="news"
                            heading="Modelling Points to Income Redistribution as Strategy for SDG 1"
                            image='http://hub.iisd.org/wp-content/uploads/2020/04/cg-548.jpg'
                            clickableCardUrl='https://sdg.iisd.org/news/modelling-points-to-income-redistribution-as-strategy-for-sdg-1/'
                        />
                        <ColumnCard
                            type="action"
                            heading="Secretly providing blankets to homeless people"
                            image='https://i2.wp.com/www.udayfoundation.org/wp-content/uploads/2017/11/blanket-donation-drive-2017.jpg?w=1224&ssl=1'
                            clickableCardUrl='/feed/actions/1'
                        />
                        <ColumnCard
                            type="event"
                            heading="Forests, Trees and Poverty Alleviation in Africa"
                            image='http://hub.iisd.org/wp-content/uploads/2020/04/cg634.jpg'
                            clickableCardUrl='https://sdg.iisd.org/events/forests-trees-and-poverty-alleviation-in-africa/'
                        />
                        <ColumnCard
                            type="event"
                            heading="Pre-Summit of the UN Food Systems Summit 2021"
                            image='http://hub.iisd.org/wp-content/uploads/2020/12/cg-917.jpg'
                            clickableCardUrl='https://sdg.iisd.org/events/pre-summit-of-the-un-food-systems-summit-2021/'
                        />
                    </SimpleGrid>

                </Box>
            </Box>

            <Box bg={useColorModeValue('gray.50', 'gray.800')} p={4} py={{ base: "70px", lg: "140px" }}>
                <Box as={Container} maxW="7xl" pb={4}>
                    <VStack alignItems="flex-start" spacing="-5px">
                        <Text color={'gray.600'} fontSize={{ base: "xl", lg: "2xl", "xl": "3xl" }} fontWeight="bold">Next</Text>
                        <Text
                            fontSize={{ base: "3xl", md: "4xl", lg: "5xl", "xl": "6xl" }}
                            fontWeight="800"
                            cursor={"pointer"}
                            onClick={handleNextLink}
                            _hover={{
                                color: goalId === "17" ? "green.400" : SDGGoals[goalId].color,
                            }}
                        >
                            {goalId === "17" ? "Learn More About the SDG" : (
                                SDGGoals[goalId].name
                            )}
                        </Text>
                    </VStack>
                </Box>

            </Box>

            <Footer />
        </Box>
    )
}

export default GoalFeed