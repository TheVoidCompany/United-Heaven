import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import ColumnCard from '../../components/cards/ColumnCard';
import Footer from '../../components/common/Footer';
import SdgGraph from '../../components/SdgGraph';
import { SDGGoals } from '../../constants/SDGGoals';
import { SDGRelation } from '../../constants/SDGRelation';

const CountryGoalPage = () => {

    const params = useParams();
    const goalId = params.goalId.slice(4).toString();
    const countryName = params.country.charAt(0).toUpperCase() + params.country.slice(1);
    const navigate = useNavigate();

    const maxNodeSize = 80;



    const goalIdRelation = SDGRelation.filter(SDGRelation => {
        return SDGRelation.sourceGoal === goalId || SDGRelation.targetGoal === goalId
    })


    const targetIds = goalIdRelation.map(SDGRelation => {
        return SDGRelation.sourceGoal === goalId ? SDGRelation.targetGoal : SDGRelation.sourceGoal
    })



    const nodes = targetIds.map(targetId => {
        return {
            id: SDGGoals[targetId - 1].id,
            label: SDGGoals[targetId - 1].id,
            labelCfg: {
                position: 'center',
                style: {
                    fill: SDGGoals[targetId - 1].color,
                    // fontStyle: 'bolder',
                    fontSize: 12,
                    fontFamily: 'Play'

                },
            },
        }
    });

    nodes.push({
        id: goalId,
        label: `Goal ${goalId}`,
        style: {
            "stroke": "rgba(95, 149, 255, 0.5)",
            "lineWidth": 2,
        },
        labelCfg: {
            position: 'center',
            style: {
                fill: '#000000CC',
                fontStyle: 'bolder',
                fontFamily: 'Play',
                fontSize: 12

            },
        },
        size: maxNodeSize
    });


    const edges = goalIdRelation.map(SDGRelation => {
        return {
            source: SDGRelation.sourceGoal,
            target: SDGRelation.targetGoal,
        }
    });


    return (
        <Box>
            <Flex
                w={'full'}
                h={'50vh'}
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
                        <Flex flex={1.4} align={"end"} pb="6">
                            <Text
                                color={'#ffffff70'}
                                fontWeight={900}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '5xl', md: '6xl' })}>
                                {countryName}
                            </Text>
                        </Flex>
                        <Flex flex={2} align={"start"}>
                            <Text
                                color={'white'}
                                fontWeight={800}
                                textShadow={'0px 0px 10px rgba(0,0,0,0.3)'}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                                {`Solve ${SDGGoals[goalId - 1].name} in ${countryName}`}
                            </Text>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>

            <Container maxW={'5xl'} py={{ base: "100px", lg: "200px" }}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack spacing={4}>
                        <Text
                            textTransform={'uppercase'}
                            color={'blue.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            p={2}
                            alignSelf={'flex-start'}
                            rounded={'md'}>
                            SDG Connection
                        </Text>
                        <Heading >Interconnections for <br />
                            <Text as={'span'} color={SDGGoals[goalId - 1].color}>
                                {SDGGoals[goalId - 1].name}
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            SDG goals are interconnected through complex relationship and
                            are capable of solving each other
                        </Text>
                    </Stack>
                    <Flex id="mountSdgGraph">
                        <Flex align="center" justify="center" w={'full'}>
                            <SdgGraph nodes={nodes} edges={edges} maxNodeSize={maxNodeSize} size={"400px"} />
                        </Flex>
                    </Flex>
                </SimpleGrid>
            </Container>

            <Box py={{ base: "80px", lg: "100px" }} bg={useColorModeValue('gray.100', 'gray.900')}>
                <Heading
                    pb={8}
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight={'500'}
                    fontFamily={'Oswald'}
                    px={{ base: '4%', '2xl': '8%' }}
                >
                    RELATED CHARITY
                </Heading>
                <Box px={{ base: '0%', 'lg': '4%', '2xl': '8%' }} bg={useColorModeValue('gray.100', 'gray.900')}>
                    <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={6}>
                        <ColumnCard
                            type="charity"
                            heading="Clean Marina Beach on 12 dec morning Marina Beach on 12 dec morning"
                            image='https://picsum.photos/200/200'
                            clickableCardUrl='/feed/actions/1'
                        />
                        <ColumnCard
                            type="charity"
                            heading="Clean Marina Beach on 12 dec morning"
                            image='https://picsum.photos/200/200'
                            clickableCardUrl='/feed/actions/1'
                        />
                        <ColumnCard
                            type="charity"
                            heading="Clean Marina Beach on 12 dec morning"
                            image='https://picsum.photos/200/200'
                            clickableCardUrl='/feed/actions/1'
                        />
                        <ColumnCard
                            type="charity"
                            heading="Clean Marina Beach on 12 dec morning"
                            image='https://picsum.photos/200/200'
                            clickableCardUrl='/feed/actions/1'
                        />
                        <ColumnCard
                            type="charity"
                            heading="Clean Marina Beach on 12 dec morning"
                            image='https://picsum.photos/200/200'
                            clickableCardUrl='/feed/actions/1'
                        />
                    </SimpleGrid>

                </Box>
            </Box>
            <Box bg={useColorModeValue('gray.50', 'gray.800')} p={4} py={{ base: "70px", lg: "140px" }}>
                <Box as={Container} maxW="7xl" pb={4}>
                    <VStack alignItems="flex-start" spacing="-5px">
                        <Text color={'gray.600'} fontSize={{ base: "xl", lg: "2xl", "xl": "3xl" }} fontWeight="bold">Learn more</Text>
                        <Text
                            fontSize={{ base: "3xl", md: "4xl", lg: "5xl", "xl": "6xl" }}
                            fontWeight="800"
                            cursor={"pointer"}
                            onClick={() => navigate(`/feed/goals/${goalId}`)}
                            _hover={{
                                color: goalId === "17" ? "green.400" : SDGGoals[goalId - 1].color,
                            }}
                        >
                            {goalId === "17" ? "Learn More About the SDG" : (
                                SDGGoals[goalId - 1].name
                            )}
                        </Text>
                    </VStack>
                </Box>

            </Box>

            <Footer />

        </Box>
    )
}

export default CountryGoalPage