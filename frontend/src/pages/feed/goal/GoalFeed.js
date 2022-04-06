import { Box, Button, Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import StatisticsCard from '../../../components/cards/StatisticsCard';
import TargetAccordianCard from '../../../components/cards/TargetAccordianCard';
import { SDGGoals } from '../../../constants/SDGGoals';

const GoalFeed = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    let goalId = params.id;


    return (
        <Box>
            <Flex
                w={'full'}
                h={'60vh'}
                mt={'-1vh'}
                backgroundImage={
                    `url(${SDGGoals[goalId - 1].coverImage})`
                }
                backgroundSize={'cover'}
                backgroundPosition={'center center'}>
                <VStack
                    w={'full'}
                    justify={'center'}
                    align={"start"}
                    paddingX={{ base: '4%', lg: "2%", '2xl': '8%' }}
                    bgGradient={`linear(to-r, ${SDGGoals[goalId - 1].color + 'CC'}, transparent)`}>
                    <Flex direction={"column"} maxW={'3xl'} align={'flex-start'} spacing={6} h="100%">
                        <Flex flex={1.2} align={"end"} pb="6">
                            <Text
                                color={'#ffffff70'}
                                fontWeight={900}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '5xl', md: '6xl' })}>
                                {SDGGoals[goalId - 1].id}
                            </Text>
                        </Flex>
                        <Flex flex={2.2} align={"start"}>
                            <Text
                                color={'white'}
                                fontWeight={800}
                                textShadow={'0px 0px 10px rgba(0,0,0,0.3)'}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                                {SDGGoals[goalId - 1].description}
                            </Text>
                        </Flex>
                        <Flex flex={0.6} align={"end"} mb="10">
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
                                        onClick={() => setIsFollowing(false)}
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
                                        onClick={() => setIsFollowing(true)}>
                                        Follow
                                    </Button>
                                )}

                            </Stack>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>
            <Box py={{ base: 20, lg: 40 }}>
                <StatisticsCard />
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

        </Box>
    )
}

export default GoalFeed