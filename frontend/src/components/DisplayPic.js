import {
    Avatar, Center, Flex, Heading, Menu,
    MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SocialButton from './common/SocialButton';
import SDGTags from './SDGTags';

const DisplayPic = ({ profile }) => {

    const navigate = useNavigate();

    return (
        <Menu isLazy>
            <MenuButton
                cursor={'pointer'}
            >
                <Stack direction={'row'} spacing={4} align={'center'} textAlign={'start'}>
                    <Avatar
                        src={profile.imageUrl}
                        alt={`user ${profile.name} profile picture`}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>{profile.name}</Text>
                        {profile.subText && <Text color={'gray.500'}>{profile.subText}</Text>}
                    </Stack>
                </Stack>
            </MenuButton>
            <MenuList alignItems={'center'}>
                <br />
                <Center>
                    <Avatar
                        size={'2xl'}
                        src={profile.imageUrl}
                    />
                </Center>
                <br />
                <Center>
                    <Heading size={"md"}>{profile.name}</Heading>
                </Center>
                <br />
                <Center>
                    <Stack direction={'row'} spacing={6}>
                        {profile.socialLinks && profile.socialLinks.map(socialLink => (
                            <SocialButton
                                key={socialLink.url}
                                label={socialLink.website}
                                href={socialLink.url}
                            >
                                {socialLink.website === 'twitter' ? <FaTwitter /> : socialLink.website === 'facebook' ? <FaFacebook /> : socialLink.website === 'instagram' ? <FaInstagram /> : null}
                            </SocialButton>
                        ))}
                    </Stack>
                </Center>
                <br />
                <Flex align={"center"} justifyContent={"center"}>
                    <SDGTags
                        wrapWidth={200}
                        position="center"
                        goals={profile.followingGoals}
                    />
                </Flex>
                <br />
                <MenuDivider />
                <MenuItem onClick={() => navigate(`/feed/profile/actions/${profile.userId}`)}>Actions</MenuItem>
                <MenuItem onClick={() => navigate(`/feed/profile/registered_actions/${profile.userId}`)}>Registered Actions</MenuItem>
            </MenuList>
        </Menu>
    )
}

DisplayPic.propTypes = {
    profile: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        subText: PropTypes.string,
        followingGoals: PropTypes.arrayOf(PropTypes.number),
        socialLinks: PropTypes.arrayOf(PropTypes.shape({
            website: PropTypes.string,
            url: PropTypes.string
        })),
    })
}

export default DisplayPic