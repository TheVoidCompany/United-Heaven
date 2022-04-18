import {
    Avatar, Stack, Text
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DisplayPic = ({ profile }) => {

    const navigate = useNavigate();

    return (
        <Stack
            cursor="pointer"
            direction={'row'}
            spacing={4}
            align={'center'}
            textAlign={'start'}
            onClick={() => navigate(`/feed/profile/${profile.userId}`)}
        >
            <Avatar
                src={profile.imageUrl}
                alt={`user ${profile.name} profile picture`}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}>{profile.name}</Text>
                {profile.subText && <Text color={'gray.500'}>{profile.subText}</Text>}
            </Stack>
        </Stack>
    )
}

DisplayPic.propTypes = {
    profile: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        subText: PropTypes.string,
    })
}

export default DisplayPic