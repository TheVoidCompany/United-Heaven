import {
    Avatar, Box, Button, Center, Divider, Flex, Heading, HStack, Icon, IconButton, Link, Menu,
    MenuButton, MenuDivider, MenuItem, MenuList, Stack, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiFillHome, AiFillThunderbolt } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoNotifications } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { SDGWheel } from '../../images/SDGWheel';
import SocialButton from '../common/SocialButton';
import SDGTags from '../SDGTags';
import '../styles.css';

const Links = [
    { name: 'Home', to: "/home", icon: AiFillHome },
    { name: 'Actions', to: "/feed/action", icon: AiFillThunderbolt },
    { name: 'Goals', to: "/feed/goal", icon: SDGWheel },
];

const UserFollowingGoals = [1, 4, 6, 15, 17];

const FeedNavbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;

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
                    <HStack spacing="6">
                        <Button
                            variant={'solid'}
                            position={useBreakpointValue({ base: 'fixed', md: 'relative' })}
                            bottom={useBreakpointValue({ base: '8', md: '0' })}
                            right={useBreakpointValue({ base: '5', md: '0' })}
                            colorScheme={'teal'}
                            display={(url === "/feed/action" || url === "/feed") ? 'flex' : 'none'}
                            size={'md'}
                            leftIcon={<MdAdd size={22} color={useColorModeValue('white', 'black')} />}>
                            Action
                        </Button>
                        <IconButton
                            size={'md'}
                            fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}
                            aria-label={`Notification`}
                            variant="ghost"
                            _focus={{ outline: 'none' }}
                            icon={<Center><IoNotifications /></Center>}
                        />
                        <Menu>
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
                                    size={useBreakpointValue({ base: 'sm', md: 'md' })}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
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
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <Heading size={"md"}>Santhosh V S</Heading>
                                </Center>
                                <br />
                                <Center>
                                    <Stack direction={'row'} spacing={6}>
                                        <SocialButton label={'Twitter'} href={'#'}>
                                            <FaTwitter />
                                        </SocialButton>
                                        <SocialButton label={'Facebook'} href={'#'}>
                                            <FaFacebook />
                                        </SocialButton>
                                        <SocialButton label={'Instagram'} href={'#'}>
                                            <FaInstagram />
                                        </SocialButton>
                                    </Stack>
                                </Center>
                                <br />
                                <Flex align={"center"} justifyContent={"center"}>
                                    <SDGTags
                                        wrapWidth={200}
                                        position="center"
                                        goals={UserFollowingGoals}
                                    />
                                </Flex>
                                <br />
                                <MenuDivider />
                                <MenuItem onClick={() => navigate('/feed/profile/actions')}>Your Actions</MenuItem>
                                <MenuItem onClick={() => navigate('/feed/profile/registered_actions')}>Registered Actions</MenuItem>
                                <MenuItem onClick={() => navigate('/feed/profile/edit_profile')}>Edit Profile</MenuItem>
                                <MenuItem _hover={{ bg: useColorModeValue('red.300', 'red.400'), color: 'white' }}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
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