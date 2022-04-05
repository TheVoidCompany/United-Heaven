import {
  Flex,
  Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center" h="100vh" direction="column">
      <Heading
        color="gray.500"
        size="lg"
      >Sorry, this page isn't available.
      </Heading>
      <Heading
        mt="2"
        size={'2xl'}
        textAlign="center"
        onClick={() => navigate('/')}
        cursor="pointer"
        _hover={{ color: 'blue.700' }}
      >Head back to United Heaven
      </Heading>
    </Flex>
  )
};

export default NotFound;
