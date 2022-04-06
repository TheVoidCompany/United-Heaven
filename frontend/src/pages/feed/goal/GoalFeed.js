import {
    Button, Flex, Stack, Text, useBreakpointValue, VStack
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import { SDGGoals } from '../../../constants/SDGGoals';

const GoalFeed = () => {

    const params = useParams();
    const navigate = useNavigate();
    let goalId = params.id;

    return (
        <Flex
            w={'full'}
            h={'60vh'}
            pos={"absolute"}
            top={'15vh'}
            left={0}
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
                            {goalId > 1 && (
                                <Button
                                    bg={'whiteAlpha.300'}
                                    rounded={'full'}
                                    color={'white'}
                                    _focus={{ outline: 'none' }}
                                    onClick={() => navigate(`/feed/goals/${--goalId}`)}
                                    _hover={{ bg: 'whiteAlpha.500' }}>
                                    Previous
                                </Button>
                            )}
                            {goalId < SDGGoals.length && (
                                <Button
                                    bg={'whiteAlpha.300'}
                                    rounded={'full'}
                                    color={'white'}
                                    _focus={{ outline: 'none' }}
                                    onClick={() => navigate(`/feed/goals/${++goalId}`)}
                                    _hover={{ bg: 'whiteAlpha.500' }}>
                                    Next
                                </Button>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default GoalFeed