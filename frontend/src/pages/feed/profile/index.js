import {
    Avatar, Box, Button, Center, Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import ColumnCard from '../../../components/cards/ColumnCard';
import SocialButton from '../../../components/common/SocialButton';
import SDGTags from '../../../components/SDGTags';

const UserFollowingGoals = [1, 4, 6, 15, 17];

const ProfilePage = () => {

    const params = useParams();
    const navigate = useNavigate();
    // const ownProfile = (!params.id || currentUserData.account_id === parseInt(params.id)) ? true : false;
    const ownProfile = true;
    const textColor = useColorModeValue('black', 'white');
    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    return (
        <Flex width="100%" justify="center" direction="column" pt={"10vh"}>
            <Flex flex="1" direction="column" align="center">
                <Avatar size="2xl" src={'https://avatars.dicebear.com/api/male/username.svg'} />
                <Heading mt="2" noOfLines={1}>Santhosh Srinivasan</Heading>
                <Box w={{ base: "100%", lg: "80%" }} >
                    <Flex mt="6" align={"center"} justifyContent={"center"}>
                        <SDGTags
                            wrapWidth={200}
                            position="center"
                            goals={UserFollowingGoals}
                        />
                    </Flex>
                    <Flex mt="6" justify="center">
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'} lg={isLargeScreen}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={'Facebook'} href={'#'} lg={isLargeScreen}>
                                <FaFacebook />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'} lg={isLargeScreen}>
                                <FaInstagram />
                            </SocialButton>
                        </Stack>
                    </Flex>
                    <Center>
                        <Flex mt="8" justifyContent="space-evenly" w={{ base: "100%", lg: "60%" }}>
                            <Flex align="center" >
                                <Heading mr="4">0</Heading>
                                <Text color="gray.600" fontSize="xl">Actions</Text>
                            </Flex>
                            <Flex align="center" >
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
                                <Tab fontWeight="800" color="gray" _selected={{ borderBottom: `6px solid ${textColor}`, color: textColor }} _focus={{ boxShadow: "none" }}>Actions</Tab>
                                <Tab fontWeight="800" color="gray" _selected={{ borderBottom: `6px solid ${textColor}`, color: textColor }} _focus={{ boxShadow: "none" }}>Registered Actions</Tab>
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