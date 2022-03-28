import {
    Box, Container, Flex, Heading,
    SimpleGrid, Stack, Text, useColorModeValue
} from '@chakra-ui/react';

const Features = ({ stats }) => {

    const themeColor = useColorModeValue('#fff', 'gray.800');


    return (
        <Box position={'relative'}>
            <Flex
                flex={1}
                zIndex={0}
                display={{ base: 'none', lg: 'flex' }}
                backgroundImage="url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9vciUyMGNoaWxkfGVufDB8fDB8fA%3D%3D&w=1000&q=80)"
                backgroundSize={'cover'}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                position={'absolute'}
                width={'50%'}
                insetY={0}
                right={0}
            >
                <Flex
                    bgGradient={`linear(to-r, ${themeColor} 10%, transparent)`}
                    w={'full'}
                    h={'full'}
                />
            </Flex>
            <Container maxW={'7xl'} zIndex={10} position={'relative'} mb={{ base: 24, lg: 0 }}>
                <Stack direction={{ base: 'column', lg: 'row' }}>
                    <Stack
                        flex={1}
                        justify={{ lg: 'center' }}
                        py={{ base: 4, md: 20, xl: 60 }}>
                        <Box mb={{ base: 8, md: 20 }}>
                            <Text
                                fontFamily={'heading'}
                                fontWeight={700}
                                textTransform={'uppercase'}
                                mb={3}
                                fontSize={'xl'}
                                color={'gray.500'}>
                                Technology
                            </Text>
                            <Heading
                                mb={5}
                                fontSize={{ base: '3xl', md: '5xl' }}>
                                Tech behind United Heaven
                            </Heading>
                            <Text fontSize={'xl'} color={'gray.500'}>
                                United Heaven uses cutting edge technology to predict
                                the best possible way to solve the SDG goals and thereby create a better
                                world for us to live.
                            </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            {stats.map((stat) => (
                                <Box key={stat.title}>
                                    <Text
                                        fontFamily={'heading'}
                                        fontSize={'3xl'}
                                        mb={3}>
                                        {stat.title}
                                    </Text>
                                    <Text fontSize={'xl'} color={'gray.500'}>
                                        {stat.content}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                    <Flex flex={1} />
                </Stack>
            </Container>
        </Box>
    );
}

export default Features;

