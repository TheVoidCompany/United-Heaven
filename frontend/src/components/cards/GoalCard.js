import {
    Box, Button, Center, Flex, Heading, Image, Stack, useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GoalCard = ({ goal }) => {

    const IMAGE = require(`../../images/SDGIcons/Goal${goal.id}.png`);

    const [isFollowing, setIsFollowing] = useState(goal.isFollowing);
    const buttonBg = useColorModeValue('#151f21', 'gray.700');
    const navigate = useNavigate();

    return (
        <Center py={12}>
            <Flex
                role={'group'}
                p={6}
                maxW={'250px'}
                minW={'full'}
                minH={{ base: '450px', sm: '380px' }}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                justify={'center'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
            >
                <Flex direction={"column"} align={'center'} onClick={() => navigate(`/feed/goals/${goal.id}`)} cursor="pointer">
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'200px'}

                        _hover={{
                            _after: {
                                transition: 'all .3s ease',
                                content: '""',
                                w: '200px',
                                h: 'full',
                                pos: 'absolute',
                                top: 5,
                                left: 0,
                                backgroundColor: goal.color,
                                filter: 'blur(15px)',
                                zIndex: -1,
                            }
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(20px)',
                            },
                        }}>
                        <Image
                            rounded={'lg'}
                            height={200}
                            width={200}
                            objectFit={'cover'}
                            src={IMAGE}
                        />
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Heading
                            textAlign={"center"}
                            fontSize={'xl'}
                            fontFamily={'body'}
                            fontWeight={900}
                            _hover={{
                                color: useColorModeValue('black', 'white')
                            }}
                            color={useColorModeValue('#151f21', 'gray.500')}
                        >
                            {goal.name}
                        </Heading>
                    </Stack>
                </Flex>
                <Button
                    bg={!isFollowing && buttonBg}
                    color={!isFollowing && 'white'}
                    rounded={'md'}
                    pos={'absolute'}
                    variant={isFollowing && 'outline'}
                    colorScheme={'gray'}
                    bottom={0}
                    right={0}
                    left={0}
                    zIndex={2}
                    onClick={() => setIsFollowing(!isFollowing)}
                    _focus={{
                        outline: 'none',
                    }}
                    m={4}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}>
                    {isFollowing ? 'Following' : 'Follow'}
                </Button>
            </Flex>
        </Center>
    )
}


export default GoalCard;