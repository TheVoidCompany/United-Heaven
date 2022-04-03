import {
    Button, Flex, Stack, Text, useBreakpointValue, VStack
} from '@chakra-ui/react';

const Hero = () => {
    return (
        <Flex
            w={'full'}
            h={'full'}
            backgroundImage={{
                base: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9vciUyMGNoaWxkfGVufDB8fDB8fA%3D%3D&w=1000&q=80)',
                lg: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80)'
            }}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        United Nation created <span style={{ fontWeight: "bolder" }} >17 SDGS</span> goals to tranform the world to a better place
                    </Text>
                    <Button
                        as={'a'}
                        bg={'whiteAlpha.300'}
                        rounded={'full'}
                        color={'white'}
                        _hover={{ bg: 'whiteAlpha.500' }}
                        href={'https://sdgs.un.org/'}
                        target={'_blank'}
                    >
                        Learn More
                    </Button>
                </Stack>
            </VStack>
        </Flex>
    );
}

export default Hero;