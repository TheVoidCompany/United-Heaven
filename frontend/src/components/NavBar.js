import { Box, Center, Flex, HStack, IconButton, Link, Spacer, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Links = [
  { name: 'Suggestions', to: "/" },
  { name: 'SDG', to: "/sdg" },
  { name: 'Read', to: "#" },
  { name: 'Sponsor', to: "#" }
];


const NavBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex
        h="8vh"
        align="center"
        paddingX={{ base: '2%', md: '8%' }}
      >
        <RouterLink to="/">
          <Text
            fontSize="2em"
            fontFamily="Play"
            userSelect="none"
            cursor="pointer"
          >
            United Heaven
          </Text>
        </RouterLink>
        <Spacer />
        <HStack spacing={4}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map(({ name, to }) => (
              <NavLink key={name} to={to}>{name}</NavLink>
            ))}
          </HStack>
          <ColorModeSwitcher />
          <IconButton
            size={'md'}
            icon={isOpen ? <Center><AiOutlineClose /></Center> : <Center><GiHamburgerMenu /></Center>}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(({ name, to }) => (
              <NavLink key={name} to={to}>{name}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const NavLink = ({ children, to }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const linkBg = useColorModeValue('gray.200', 'gray.700');

  const handleClick = () => {
    navigate(to);
  };


  return (
    <Link
      px={3}
      py={2}
      fontWeight="bold"
      fontSize="1em"
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
      }}
      bg={url === to ? linkBg : 'transparent'}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavBar;
