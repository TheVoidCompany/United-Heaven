import {
    Avatar, Box, Button, Center, Divider, Flex, HStack, Icon, Link, Menu,
    MenuButton, MenuDivider, MenuItem, MenuList, Tag, useColorModeValue, Wrap, WrapItem
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiFillHome, AiFillThunderbolt } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

const Links = [
    { name: 'Home', to: "/feed", icon: AiFillHome },
    { name: 'Actions', to: "/feed/action", icon: AiFillThunderbolt },
    { name: 'Notification', to: "/feed/notification", icon: IoNotifications }
];

const UserFollowingGoals = [1, 4, 6, 15, 17];

const FeedNavbar = () => {

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
                            colorScheme={'teal'}
                            size={'md'}
                            leftIcon={<MdAdd size={22} color={useColorModeValue('white', 'black')} />}>
                            Action
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'md'}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
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
                                    <p>Santhosh V S</p>
                                </Center>
                                <br />

                                <Flex align={"center"} justifyContent={"center"}>
                                    <Wrap maxW={200} justify='center'>
                                        {UserFollowingGoals.map(goal => {
                                            return (
                                                <WrapItem>
                                                    <Tag size="sm" variant='solid'>Goal-{goal}</Tag>
                                                </WrapItem>
                                            )
                                        })}
                                    </Wrap>
                                </Flex>
                                <br />
                                <MenuDivider />
                                <MenuItem>Your Actions</MenuItem>
                                <MenuItem>Registered Actions</MenuItem>
                                <MenuItem>Edit Profile</MenuItem>
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
            color={url === to ? linkColor : 'gray.500'}
            onClick={handleClick}
            display={"flex"}
            alignItems="center"
        >
            <Icon
                as={icon}
                fontSize={{ base: 30, md: 24 }}
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