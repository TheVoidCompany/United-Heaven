import {
    Avatar, Box, Button, Divider, HStack, Image, Spacer, Stack, Tag, Text, useColorModeValue, Wrap, WrapItem
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { findTypeColor } from '../../utils/common';
import Heading from '../common/Heading';

const FeedCard = ({ profile, type, heading, image, para, sdgTags, buttonText, buttonOnClick }) => {

    return (
        <>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                p={6}
                overflow={'hidden'}
            >
                {profile && (
                    <Stack mb={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar
                            src={profile.imageUrl}
                            alt={`user ${profile.name} profile picture`}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>{profile.name}</Text>
                            {profile.subText && <Text color={'gray.500'}>{profile.subText}</Text>}
                        </Stack>
                    </Stack>
                )}
                {image && (
                    <Image
                        src={image}
                        layout={'fill'}
                        mb={6}
                        w="100%"
                        rounded={"lg"}
                    />
                )}
                <Stack>
                    <Text
                        color={findTypeColor(type)}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        {type}
                    </Text>
                    {heading && (
                        <Heading
                            size="2xl"
                            isExternal={type === "news" || type === "event"}
                        >
                            {heading}
                        </Heading>
                    )}
                    {para && (
                        <Text color={'gray.500'}>
                            {para}
                        </Text>
                    )}

                    {sdgTags && (
                        <Wrap>
                            {sdgTags.map(goal => {
                                return (
                                    <WrapItem>
                                        <Tag size="sm" variant='solid'>Goal-{goal}</Tag>
                                    </WrapItem>
                                )
                            })}
                        </Wrap>
                    )}

                </Stack>
                {buttonText && (
                    <HStack mt="2">
                        <Spacer />
                        <Button colorScheme='twitter' variant='solid' onClick={buttonOnClick}>
                            {buttonText}
                        </Button>
                    </HStack>
                )}
            </Box>
            <Divider />
        </>
    );

}


FeedCard.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        subText: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
    }),
    type: PropTypes.oneOf(['action', 'news', 'event']).isRequired,
    heading: PropTypes.string,
    image: PropTypes.string,
    para: PropTypes.string,
    sdgTags: PropTypes.arrayOf(PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])),
    buttonText: PropTypes.string,
    buttonOnClick: PropTypes.func
}


export default FeedCard;