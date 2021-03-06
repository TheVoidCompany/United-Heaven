import { Box, Center, Flex, HStack, IconButton, Link, Spacer, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { FaGithub } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { SDGGoals } from '../../constants/SDGGoals';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import '../styles.css';

const Links = [
  { name: 'Prime', to: "/suggestion" },
  { name: 'Sight', to: "/sight" },
  { name: 'Feed', to: "/feed" },
  { name: 'Study', to: "/study" },
  { name: 'Donate us', to: "https://www.buymeacoffee.com/unitedheaven", external: true }
];


const NavBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const url = location.pathname;
  const feedSubUrl = url.slice(5);
  //check if feedSubUrl is '/goals/' + number and if so, set the goalId to the number
  const goalId = feedSubUrl.includes('/goals/') ? feedSubUrl.slice(7) ? feedSubUrl.slice(7) : null : null;
  const formattedUrl = url === '/' ? '/suggestion' : url;

  useEffect(() => {
    //show and hide the navbar on scroll down and up respectively
    let lastScrollTop = 0;
    const handleScroll = () => {

      const navbar = document.getElementById('navbar');

      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        navbar.style.top = '-8vh';
      } else {
        navbar.style.top = '0';
      }
      lastScrollTop = st <= 0 ? 0 : st;

    }

    if (formattedUrl.includes('/feed')) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, [formattedUrl]);



  return (
    <Box
      id="navbar"
      w="100vw"
      zIndex={20}
      position={(url === '/study' || url.includes('/feed')) ? "fixed" : "relative"}
      bg={useColorModeValue('gray.100', 'gray.900')}
      className="fixedTransistion"
    >
      <Flex
        h="8vh"
        align="center"
        paddingX={{ base: '4%', lg: "2%", '2xl': '8%' }}
      >
        <RouterLink to="/">
          <Text
            fontSize={{ base: '1.5em', sm: '2em' }}
            fontFamily="Ailerons"
            userSelect="none"
            cursor="pointer"
            noOfLines={1}
            color={goalId && SDGGoals[goalId - 1].color}
          >
            United Heaven
          </Text>
        </RouterLink>
        <Spacer />
        <HStack spacing={4}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', lg: 'flex' }}>
            {Links.map(({ name, to, external }) => (
              <NavLink key={name} to={to} external={external}>{name}</NavLink>
            ))}
          </HStack>

          <IconButton
            size="md"
            fontSize="xl"
            variant="ghost"
            color="current"
            marginLeft="2"
            display={{ base: "none", lg: 'flex' }}
            _focus={{ outline: 'none' }}
            onClick={() => window.open('https://github.com/TheVoidCompany/United-Heaven', '_blank')}
            icon={<FaGithub />}
          />
          <ColorModeSwitcher />
          <IconButton
            size={'md'}
            icon={isOpen ? <Center><AiOutlineClose /></Center> : <Center><GiHamburgerMenu /></Center>}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} mt={url.includes('/feed') && '8vh'} zIndex={50} display={{ lg: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(({ name, to, external }) => (
              <NavLink key={name} to={to} external={external} close={onClose}>{name}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const NavLink = ({ children, to, close, external }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const formattedUrl = url === '/' ? '/suggestion' : url;

  const linkBg = useColorModeValue('gray.200', 'gray.700');

  const handleClick = () => {
    close && close()
    if (external) {
      window.open(to, '_blank');
    } else {
      navigate(to);
    }
  };

  return (
    <Link
      px={3}
      py={2}
      fontWeight="bold"
      fontSize="1em"
      className='noselect'
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
      }}
      //change bg color of the link depending on the current url and its sub-urls
      bg={formattedUrl.includes(to) ? linkBg : 'transparent'}

      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavBar;
