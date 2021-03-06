import {
    Avatar, Box, Button, Center, Divider, Flex, Heading, HStack, Icon, IconButton, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useBreakpointValue, useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { AiFillHome, AiFillThunderbolt } from "react-icons/ai";
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoNotifications } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import { FakeNotification } from '../../data/FakeNotification';
import DefaultDP from '../../images/defaultDP.jpeg';
import { SDGWheel } from '../../images/SDGWheel';
import SocialButton from '../common/SocialButton';
import SDGTags from '../SDGTags';
import '../styles.css';


const Links = [
    { name: 'Home', to: "/home", icon: AiFillHome },
    { name: 'Actions', to: "/feed/actions", icon: AiFillThunderbolt },
    { name: 'Goals', to: "/feed/goals", icon: SDGWheel },
];


const FeedNavbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode } = useColorMode();
    const avatarSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const url = location.pathname;
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { currentUser, setCurrentUser } = useContext(UserContext);


    useEffect(() => {
        //show and hide the navbar on scroll down and up respectively
        let lastScrollTop = 0;
        const handleScroll = () => {

            //get navbar
            const navbar = document.getElementById('feednavbar');

            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                navbar.style.top = '0';
            } else {
                navbar.style.top = '8vh';
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, []);

    const profileOutlineColor = useColorModeValue('rgba(66, 123, 255, 0.6)', 'rgba(66, 123, 255, 0.9)');


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setCurrentUser({});
        navigate('/feed');
    }

    return (
        <Box
            id="feednavbar"
            position="fixed"
            w="100vw"
            top="8vh"
            zIndex={20}
            bg={useColorModeValue('gray.100', 'gray.900')}
            className="fixedTransistion"
        >
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                paddingX={{ base: '4%', lg: "2%", '2xl': '8%' }}
            >
                <HStack spacing={8} alignItems={'center'}>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display='flex'
                    >
                        {Links.map(({ name, to, icon }) => (
                            <NavLink key={name} to={to} icon={icon}>{name}</NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    {isAuthenticated ? (
                        <HStack spacing="6">
                            <Button
                                variant={'solid'}
                                position={{ base: 'fixed', md: 'relative' }}
                                bottom={{ base: '8', md: '0' }}
                                right={{ base: '5', md: '0' }}
                                colorScheme={'teal'}
                                display={((url.slice(5).includes("/actions") && url.slice(5) !== "/actions/create") || url === "/feed") ? 'flex' : 'none'}
                                size={'md'}
                                onClick={() => navigate('/feed/actions/create')}
                                leftIcon={<MdAdd size={22} color={colorMode === 'light' ? 'white' : 'black'} />}>
                                Action
                            </Button>

                            <Menu isLazy >
                                <IconButton
                                    as={MenuButton}
                                    size={'md'}
                                    fontSize={{ base: '2xl', md: '3xl' }}
                                    aria-label={`Notification`}
                                    variant="ghost"
                                    _focus={{ outline: 'none' }}
                                    icon={<Center><IoNotifications /></Center>}
                                />
                                <MenuList alignItems={'center'} >
                                    {FakeNotification.map(({ id, type, action, name, profileUrl }) => (
                                        <MenuItem key={id} maxW={'400px'}>
                                            <Flex alignItems={'center'}>
                                                <Avatar
                                                    size={avatarSize}
                                                    src={profileUrl}
                                                    name={name}
                                                    borderRadius={'full'}
                                                />
                                                <Box ml={2}>
                                                    <Text size={'sm'}>
                                                        <Text as={'span'} fontWeight={'bold'}>
                                                            {name + " "}
                                                        </Text>
                                                        {type + " "}
                                                        <Text as={'span'} fontWeight={'bold'}>
                                                            {action + " "}
                                                        </Text>
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>


                            <Menu isLazy>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}
                                    shadow={'md'}
                                    _focus={{ outline: 'none' }}
                                >
                                    <Avatar
                                        size={avatarSize}
                                        src={currentUser.image_url}
                                        fallbackSrc={DefaultDP}
                                        outline={url.includes('profile') ? "3px solid" : "0px"}
                                        outlineColor={profileOutlineColor}
                                        outlineOffset={'2px'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={currentUser.image_url}
                                            fallbackSrc={DefaultDP}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <Heading size={"md"}>{currentUser.name}</Heading>
                                    </Center>
                                    <br />
                                    <Center>
                                        <Stack direction={'row'} spacing={6}>
                                            {currentUser.social_links?.facebook_url && (
                                                <SocialButton circle label={'Twitter'} href={currentUser.social_links?.facebook_url}>
                                                    <FaTwitter />
                                                </SocialButton>
                                            )}
                                            {currentUser.social_links?.instagram_url && (
                                                <SocialButton circle label={'Instagram'} href={currentUser.social_links?.instagram_url}>
                                                    <FaInstagram />
                                                </SocialButton>
                                            )}
                                            {currentUser.social_links?.linkedIn_url && (
                                                <SocialButton circle label={'LinkedIn'} href={currentUser.social_links?.linkedIn_url}>
                                                    <FaLinkedin />
                                                </SocialButton>
                                            )}
                                        </Stack>
                                    </Center>
                                    <br />
                                    <Flex align={"center"} justifyContent={"center"}>
                                        <SDGTags
                                            wrapWidth={200}
                                            position="center"
                                            goals={currentUser.following_goals}
                                        />
                                    </Flex>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={() => navigate('/feed/profile')}>Profile</MenuItem>
                                    <MenuItem onClick={() => navigate('/feed/profile/edit_profile')}>Edit Profile</MenuItem>
                                    <MenuItem
                                        _hover={{ bg: colorMode === 'light' ? 'red.300' : 'red.400', color: 'white' }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    ) : (
                        <Stack
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={8}>
                            <Button
                                as={'a'}
                                fontSize={'sm'}
                                fontWeight={400}
                                onClick={() => navigate('/login')}
                                variant={'link'}
                                href={'#'}>
                                Sign In
                            </Button>
                            <Button
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'green.500'}
                                onClick={() => navigate('/signup')}
                                _hover={{
                                    bg: 'green.600',
                                }}>
                                Sign Up
                            </Button>
                        </Stack>
                    )}

                </Flex>
            </Flex>
            <Divider />
        </Box>
    )
}

const NavLink = ({ children, to, icon }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    const formattedUrl = url === '/feed' ? '/home' : url;

    const linkColor = useColorModeValue('black', 'white');

    const handleClick = () => {
        navigate(to);
    };


    return (
        <Link
            px={1}
            fontWeight="900"
            fontSize="1.4em"
            className='noselect'
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                color: linkColor
            }}
            color={formattedUrl.includes(to) ? linkColor : 'gray.500'}
            onClick={handleClick}
            display={"flex"}
            alignItems="center"
        >
            <Icon
                as={icon}
                fontSize={{ base: 26, md: 24 }}
                mr="2"
            />
            <Box
                display={{ base: "none", md: "inline-flex" }}
            >
                {children}
            </Box>
        </Link>
    );
};

export default FeedNavbar