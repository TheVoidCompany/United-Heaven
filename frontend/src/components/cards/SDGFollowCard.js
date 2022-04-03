import { Button, HStack, Image, Spacer, Tag, useColorModeValue, VStack } from '@chakra-ui/react';
import { SDGGoals } from '../../constants/SDGGoals';
import Heading from '../common/Heading';

const SDGFollowCard = ({ goalId = 1 }) => {
    return (
        <HStack
            p="4"
            cursor='pointer'
            _hover={{
                backgroundColor: useColorModeValue('gray.100', 'gray.800'),
            }}>
            <Image
                boxSize='80px'
                src={require(`../../images/SDGIcons/Goal${goalId}.png`)}
                mr="1"
            />
            <VStack
                alignItems="flex-start"
                spacing="1px"
                ml="2"
                maxW={40}
            >
                <Heading
                    size="lg"
                    customStyles={{ noOfLines: 3, mb: 1 }}
                >
                    {SDGGoals[goalId - 1].name}
                </Heading>
                <Tag size="sm" variant='solid' backgroundColor={SDGGoals[goalId - 1].color}>
                    {goalId}
                </Tag>

            </VStack>
            <Spacer />
            <Button colorScheme='gray' variant='outline' size="sm" >
                Follow
            </Button>
        </HStack>
    )
}

export default SDGFollowCard