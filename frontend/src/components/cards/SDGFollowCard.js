import { Button, HStack, Image, Spacer, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SDGGoals } from '../../constants/SDGGoals';
import Heading from '../common/Heading';
import SDGTags from '../SDGTags';

const SDGFollowCard = ({ goalId = 1 }) => {

    const navigate = useNavigate();

    const handleFollow = (event) => {
        event.stopPropagation();
    }

    return (
        <HStack
            p="4"
            cursor='pointer'
            onClick={() => navigate(`/feed/goals/${goalId}`)}
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
                <SDGTags
                    goals={[goalId]}
                />

            </VStack>
            <Spacer />
            <Button
                colorScheme='gray'
                variant='outline'
                size="sm"
                onClick={handleFollow}
            >
                Follow
            </Button>
        </HStack>
    )
}

export default SDGFollowCard