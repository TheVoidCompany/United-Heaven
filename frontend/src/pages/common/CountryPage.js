import { Box, Container, Flex, Heading, Hide, Icon, Show, SimpleGrid, Stack, StackDivider, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { ImArrowDown2, ImArrowRight2, ImArrowUp2, ImArrowUpRight2 } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router';
import TrendsCard from '../../components/cards/TrendsCard';
import AreaChart from '../../components/Charts/AreaChart';
import DonutChart from '../../components/Charts/DonutChart';
import Footer from '../../components/common/Footer';
import countryDetails from '../../data/countriesDetail.json';
import FakeTrendsValue from '../../data/FakeTrendValue.json';
import { getCountryImage } from '../../services/CountryService';


const goalProgressionData = [
    {
        value: 63.4,
        city: 'Goal 1',
        date: '2011-10-01',
    },
    {
        value: 62.7,
        city: 'Goal 2',
        date: '2011-10-01',
    },
    {
        value: 72.2,
        city: 'Goal 3',
        date: '2011-10-01',
    },
    {
        value: 58,
        city: 'Goal 1',
        date: '2011-10-02',
    },
    {
        value: 59.9,
        city: 'Goal 2',
        date: '2011-10-02',
    },
    {
        value: 67.7,
        city: 'Goal 3',
        date: '2011-10-02',
    },
    {
        value: 53.3,
        city: 'Goal 1',
        date: '2011-10-03',
    },
    {
        value: 59.1,
        city: 'Goal 2',
        date: '2011-10-03',
    },
    {
        value: 69.4,
        city: 'Goal 3',
        date: '2011-10-03',
    },
    {
        value: 55.7,
        city: 'Goal 1',
        date: '2011-10-04',
    },
    {
        value: 58.8,
        city: 'Goal 2',
        date: '2011-10-04',
    },
    {
        value: 68,
        city: 'Goal 3',
        date: '2011-10-04',
    },
    {
        value: 64.2,
        city: 'Goal 1',
        date: '2011-10-05',
    },
    {
        value: 58.7,
        city: 'Goal 2',
        date: '2011-10-05',
    },
    {
        value: 72.4,
        city: 'Goal 3',
        date: '2011-10-05',
    },
    {
        value: 58.8,
        city: 'Goal 1',
        date: '2011-10-06',
    },
    {
        value: 57,
        city: 'Goal 2',
        date: '2011-10-06',
    },
    {
        value: 77,
        city: 'Goal 3',
        date: '2011-10-06',
    },
    {
        value: 57.9,
        city: 'Goal 1',
        date: '2011-10-07',
    },
    {
        value: 56.7,
        city: 'Goal 2',
        date: '2011-10-07',
    },
    {
        value: 82.3,
        city: 'Goal 3',
        date: '2011-10-07',
    },
];


const CountryPage = () => {

    const params = useParams();
    const countryIso = params.country;
    const countryName = countryDetails.find(country => country.code3 === countryIso.toUpperCase()).name;
    const navigate = useNavigate();

    const [countryImage, setcountryImage] = useState(null);

    useEffect(() => {
        getCountryImage(countryName).then(imageUrl => {
            setcountryImage(imageUrl);
        });

    }, [countryName]);



    return (
        <Box>
            <Flex
                w={'full'}
                h={'60vh'}
                backgroundImage={countryImage}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}>
                <VStack
                    w={'full'}
                    justify={'center'}
                    align={"start"}
                    paddingX={{ base: '4%', lg: "2%", '2xl': '8%' }}
                    bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                    <Flex direction={"column"} maxW={'3xl'} align={'flex-start'} spacing={6} h="100%">
                        <Flex flex={1.4} align={"end"} pb="6">
                            <Text
                                color={'#ffffff70'}
                                fontWeight={900}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '5xl', md: '6xl' })}>
                                {countryName.toUpperCase()}
                            </Text>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>
            <Container maxW={'5xl'} pt={{ base: "100px", lg: "200px" }} pb={{ base: "50px", lg: "80px" }}>
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
                            Country Score
                        </Text>
                        <Heading >Country Scores for <br />
                            {countryName}
                        </Heading>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                            }>
                            <Text fontWeight={600}>SDG Index Rank: 120 / 165</Text>
                            <Text fontWeight={600}>SDG Index Score: 60%</Text>
                            <Text fontWeight={600}>Spillover Score: 85%</Text>
                        </Stack>
                    </Stack>
                    <Flex align="center" justify="center" w={'full'}>
                        <DonutChart />
                    </Flex>
                </SimpleGrid>
            </Container>

            <Container maxW={'5xl'} py={{ base: "100px", lg: "200px" }}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Hide below="md">
                        <Flex align="center" justify="center" w={'full'}>
                            <AreaChart data={goalProgressionData} />
                        </Flex>
                    </Hide>
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
                            Goal Progress
                        </Text>
                        <Heading >Progression of <br />
                            SDG goals in {countryName}
                        </Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            Progression of SDG goals are calculated by making Time-Series analysis on the goal's respective targets
                        </Text>
                    </Stack>
                    <Show below="md">
                        <Flex align="center" justify="center" w={'full'}>
                            <AreaChart data={goalProgressionData} />
                        </Flex>
                    </Show>
                </SimpleGrid>
            </Container>

            <Box py={{ base: "80px", lg: "100px" }} bg={useColorModeValue('gray.100', 'gray.900')}>
                <Heading
                    pb={6}
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight={'500'}
                    fontFamily={'Oswald'}
                    px={{ base: '4%', '2xl': '8%' }}
                >
                    SDG RATINGS AND TRENDS
                </Heading>
                <Flex
                    as={Text}
                    mb={2}
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight={'500'}
                    px={{ base: '4%', '2xl': '8%' }}
                    align={"center"}
                    wrap={'wrap'}
                    color={'gray.600'}
                >
                    <Text mr={4} mt={2}>Ratings:</Text>
                    <Flex align={"center"} mt={2}><Icon mr={2} as={BsFillCircleFill} h={5} w={5} color={'green.500'} /> SDG achieved</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={BsFillCircleFill} h={5} w={5} color={'yellow.500'} /> Challenges remain</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={BsFillCircleFill} h={5} w={5} color={'orange.500'} /> Significant challenges remain</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={BsFillCircleFill} h={5} w={5} color={'red.500'} /> Major challenges remain</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={BsFillCircleFill} h={5} w={5} color={'gray.500'} /> information unavailable</Flex>

                </Flex>
                <Flex
                    as={Text}
                    mb={12}
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight={'500'}
                    px={{ base: '4%', '2xl': '8%' }}
                    align={"center"}
                    wrap={'wrap'}
                    color={'gray.600'}
                >
                    <Text mr={4} mt={2}>Trends:</Text>
                    <Flex align={"center"} mt={2}><Icon mr={2} as={ImArrowUp2} h={5} w={5} color={'green.500'} /> On track or maintaining SDG achievement</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={ImArrowUpRight2} h={5} w={5} color={'yellow.500'} /> Moderately improving</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={ImArrowRight2} h={5} w={5} color={'orange.500'} /> Stagnating</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={ImArrowDown2} h={5} w={5} color={'red.500'} /> Decreasing</Flex>
                    <Flex align={"center"} mt={2}><Icon ml={4} mr={2} as={IoCloseSharp} h={5} w={5} color={'gray.500'} /> information unavailable</Flex>

                </Flex>
                <Box px={{ base: '0%', 'lg': '4%', '2xl': '8%' }} >
                    <SimpleGrid minChildWidth={"180px"} spacing={4}>
                        {FakeTrendsValue.map((trend) => {
                            return (
                                <TrendsCard
                                    key={trend.goalId}
                                    goalId={trend.goalId}
                                    trendValue={trend?.trendValue}
                                    ratingValue={trend?.ratingValue}
                                    countryIso={countryIso}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Box>
            </Box>

            <Footer />

        </Box>
    )
}

export default CountryPage