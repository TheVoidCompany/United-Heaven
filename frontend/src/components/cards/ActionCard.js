import {
    Avatar, Box, Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react';

const ActionCard = () => {

    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            p={6}
            overflow={'hidden'}
        >
            {/* <Box
                h={'290px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}>
                <Image
                    src={
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                    layout={'fill'}
                />
            </Box> */}
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
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Avatar
                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                    alt={'Author'}
                />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>Achim Rolle</Text>
                    <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                </Stack>
            </Stack>
        </Box>
    );

}

export default ActionCard;