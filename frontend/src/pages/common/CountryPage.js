import { Box, Flex, Heading, Icon, SimpleGrid, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { ImArrowDown2, ImArrowRight2, ImArrowUp2, ImArrowUpRight2 } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router';
import ColumnCard from '../../components/cards/ColumnCard';
import TrendsCard from '../../components/cards/TrendsCard';
import Footer from '../../components/common/Footer';
import countryDetails from '../../data/countriesDetail.json';
import { getCountryImage } from '../../services/CountryService';

const trendsValue = [{
    goalId: "1",
    trendValue: "Up",
    ratingValue: "achieved"
}, {
    goalId: "2",
    trendValue: "Down",
    ratingValue: "remain"
},
{
    goalId: "3",
    trendValue: "Right",
    ratingValue: "remain"
},
{
    goalId: "4",
    trendValue: "Right",
    ratingValue: "achieved"
}, {
    goalId: "5",
    ratingValue: "significant remain"
},
{
    goalId: "6",
    trendValue: "Down",
    ratingValue: "achieved"
},
{
    goalId: "7",
    trendValue: "Up",
    ratingValue: "remain"
}, {
    goalId: "8",
    trendValue: "Down",
    ratingValue: "achieved"
},
{
    goalId: "9",
    ratingValue: "Major remain"
},
{
    goalId: "10",
    trendValue: "Right",
    ratingValue: "significant remain"
}, {
    goalId: "11",
    trendValue: "Right",
    ratingValue: "remain"
},
{
    goalId: "12",
    trendValue: "Up Right",
    ratingValue: "Major remain"
},
{
    goalId: "13",
    trendValue: "Up",
    ratingValue: "Major remain"
}, {
    goalId: "14",
    trendValue: "Up Right",
},
{
    goalId: "15",
    trendValue: "Down",
    ratingValue: "significant remain"
},
{
    goalId: "16",
    trendValue: "Down",
    ratingValue: "significant remain"
},
{
    goalId: "17",
    trendValue: "Up Right",
    ratingValue: "remain"
},
]

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

    }, [countryName])



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
                                {countryName}
                            </Text>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>

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
                        {trendsValue.map((trend) => {
                            return (
                                <TrendsCard
                                    key={trend.goalId}
                                    goalId={trend.goalId}
                                    trendValue={trend?.trendValue}
                                    ratingValue={trend?.ratingValue}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Box>
            </Box>

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

            <Footer />

        </Box>
    )
}

export default CountryPage