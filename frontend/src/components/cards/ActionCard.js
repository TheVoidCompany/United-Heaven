import {
    Avatar, Box, Button, Divider, Heading, HStack, Image, Spacer, Stack, Tag, Text, useColorModeValue, Wrap, WrapItem
} from '@chakra-ui/react';

const UserFollowingGoals = [1, 4, 6, 15, 17];

const ActionCard = () => {

    return (
        <>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                p={6}
                overflow={'hidden'}
            >
                <Stack mb={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                        alt={'Author'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>Achim Rolle</Text>
                        <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                    </Stack>
                </Stack>
                <Image
                    src={
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                    layout={'fill'}
                    mb={6}
                    w="100%"
                    rounded={"lg"}
                />
                <Stack>
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        Action
                    </Text>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        Clean marina beach
                    </Heading>
                    <Text color={'gray.500'}>
                        Marina beach is the second largest beach in the world and it is not maintained
                        properly. The beach is full of litters and it's affecting everyone. So me and my
                        friends are planning to clean the beach this sunday. Any one interested can join!!
                    </Text>
                    <Wrap>
                        {UserFollowingGoals.map(goal => {
                            return (
                                <WrapItem>
                                    <Tag size="sm" variant='solid'>Goal-{goal}</Tag>
                                </WrapItem>
                            )
                        })}
                    </Wrap>
                </Stack>
                <HStack mt="2">
                    <Spacer />
                    <Button colorScheme='twitter' variant='solid'>
                        Participate
                    </Button>
                </HStack>

            </Box>
            <Divider />
        </>
    );

}

export default ActionCard;