import {
    Avatar, Box, Button, Center, Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import ColumnCard from '../../../components/cards/ColumnCard';
import LoadingScreen from '../../../components/common/LoadingScreen';
import SocialButton from '../../../components/common/SocialButton';
import SDGTags from '../../../components/SDGTags';
import { UserContext } from '../../../context/userContext';
import { getUserFollowingGoals } from '../../../services/GoalService';
import { getUser } from '../../../services/UserService';
import NotFound from '../../NotFound';

const ProfilePage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const userId = params.id;
    const { currentUser } = useContext(UserContext);
    const ownProfile = (!params.id || currentUser.user_id === params.id) ? true : false;
    const textColor = useColorModeValue('black', 'white');
    const isLargeScreen = useBreakpointValue({ base: false, lg: true });
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noUserFound, setNoUserFound] = useState(false);


    const handleActionsClick = () => {
        if (ownProfile) {
            navigate('/feed/profile/actions');
        } else {
            navigate(`/feed/profile/${userId}/actions`);
        }
    }

    const handleRegisteredActionsClick = () => {
        if (ownProfile) {
            navigate('/feed/profile/registered_actions');
        } else {
            navigate(`/feed/profile/${userId}/registered_actions`);
        }
    }

    useEffect(() => {

        async function fetchUserDetails() {
            try {
                const response = await getUser(userId);
                const goalResponse = await getUserFollowingGoals(userId);
                const userDetail = {
                    ...response.data,
                    following_goals: goalResponse.data
                }
                setUserDetails(userDetail);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setNoUserFound(true);
            }
        }

        if (ownProfile) {
            setUserDetails(currentUser);
        } else {
            setIsLoading(true);
            fetchUserDetails();
        }
    }, [userId, currentUser, ownProfile]);


    if (isLoading) {
        return (
            <Box h="84vh">
                <LoadingScreen size="xl" />
            </Box>
        )
    }

    if (noUserFound) {
        return <NotFound />;
    }


    return (
        <Flex width="100%" justify="center" direction="column" pt={"10vh"}>
            <Flex flex="1" direction="column" align="center">
                <Avatar size="2xl" src={userDetails.image_url} />
                <Heading mt="2" noOfLines={1}>{userDetails.name}</Heading>
                <Box w={{ base: "100%", lg: "80%" }} >
                    <Flex mt="6" align={"center"} justifyContent={"center"}>
                        <SDGTags
                            wrapWidth={200}
                            position="center"
                            goals={userDetails.following_goals}
                        />
                    </Flex>
                    <Flex mt="6" justify="center">
                        <Stack direction={'row'} spacing={6}>
                            {currentUser.social_links?.facebook_url && (
                                <SocialButton label={'Facebook'} href={currentUser.social_links?.facebook_url} lg={isLargeScreen}>
                                    <FaFacebook />
                                </SocialButton>
                            )}
                            {currentUser.social_links?.instagram_url && (
                                <SocialButton label={'Instagram'} href={currentUser.social_links?.instagram_url} lg={isLargeScreen}>
                                    <FaInstagram />
                                </SocialButton>
                            )}
                            {currentUser.social_links?.linkedIn_url && (
                                <SocialButton label={'LinkedIn'} href={currentUser.social_links?.linkedIn_url} lg={isLargeScreen}>
                                    <FaLinkedin />
                                </SocialButton>
                            )}
                        </Stack>
                    </Flex>
                    <Center>
                        <Flex mt="8" justifyContent="space-evenly" w={{ base: "100%", lg: "60%" }}>
                            <Flex align="center" onClick={() => handleActionsClick()} cursor="pointer">
                                <Heading mr="4">0</Heading>
                                <Text color="gray.600" fontSize="xl">Actions</Text>
                            </Flex>
                            <Flex align="center" onClick={() => handleRegisteredActionsClick()} cursor="pointer">
                                <Heading mr="4">0</Heading>
                                <Text color="gray.600" fontSize="xl">Registered Actions</Text>
                            </Flex>
                        </Flex>
                    </Center>
                    {ownProfile && (
                        <Center>
                            <Flex mt="6" w={{ base: "100%", lg: "60%" }}>
                                <Button isFullWidth variant="outline" _focus={{ outline: "none" }} mx="8" onClick={() => navigate('/feed/profile/edit_profile')}>
                                    Edit Profile
                                </Button>
                            </Flex>
                        </Center>
                    )}

                    <Flex mt="10">
                        <Tabs isFitted variant="unstyled" w="100%" isLazy>
                            <TabList>
                                <Tab fontWeight="800" color="gray" _selected={{ borderBottom: `6px solid ${textColor}`, color: textColor }} _focus={{ boxShadow: "none" }}>Current Actions</Tab>
                                <Tab fontWeight="800" color="gray" _selected={{ borderBottom: `6px solid ${textColor}`, color: textColor }} _focus={{ boxShadow: "none" }}>Past Actions</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0} pt="8">
                                    <Box>
                                        <ColumnCard
                                            type="action"
                                            heading="Clean Marina Beach on 12 dec morning"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/1'
                                        />
                                        <ColumnCard
                                            type="action"
                                            heading="12 students started environment campaign in south india"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/2'
                                        />
                                        <ColumnCard
                                            type="action"
                                            heading="Teach young students of africa about the importance of computer science in the modern world"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/3'
                                        />
                                        <ColumnCard
                                            type="action"
                                            heading="Global SDG conference is happening in california, US"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/1'
                                        />

                                    </Box>
                                </TabPanel>
                                <TabPanel p={0} pt="8">
                                    <Box>
                                        <ColumnCard
                                            type="action"
                                            heading="Clean Marina Beach on 12 dec morning"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/1'
                                        />
                                        <ColumnCard
                                            type="action"
                                            heading="12 students started environment campaign in south india"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/2'
                                        />
                                        <ColumnCard
                                            type="action"
                                            heading="Teach young students of africa about the importance of computer science in the modern world"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/3'
                                        />
                                        <ColumnCard
                                            type="action"
                                            heading="Global SDG conference is happening in california, US"
                                            image='https://picsum.photos/200/200'
                                            clickableCardUrl='/feed/actions/1'
                                        />

                                    </Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Box>
            </Flex>
        </Flex >
    )
}

export default ProfilePage