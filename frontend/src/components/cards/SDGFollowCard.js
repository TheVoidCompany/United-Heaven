import { Button, HStack, Image, Spacer, Tag, VStack } from '@chakra-ui/react';
import { SDGGoals } from '../../constants/SDGGoals';
import Heading from '../common/Heading';

const SDGFollowCard = ({ goalId = 1 }) => {
    return (
        <HStack p="4">

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
                    Goal-{goalId}
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