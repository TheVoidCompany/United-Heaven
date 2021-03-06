import {
    Box, Circle, Divider, Flex, HStack, Icon, Image, ScaleFade,
    Spacer, Stack, Text, useClipboard, useColorMode, useColorModeValue, useToast
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { FaGlobeAmericas } from 'react-icons/fa';
import { IoIosHeart, IoIosHeartEmpty, IoIosShareAlt } from "react-icons/io";
import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import { likeAction, unLikeAction } from '../../services/ActionService';
import { findTypeColor } from '../../utils/common';
import Heading from '../common/Heading';
import DisplayPic from '../DisplayPic';
import SDGTags from '../SDGTags';

const FeedCard = ({
    actionId = 2,
    profile,
    type,
    heading,
    image,
    isOnline,
    para,
    location,
    url,
    startDate,
    endDate,
    sdgGoals,
    sdgTargets,
    footer,
    clickableCardUrl
}) => {

    const shareUrl = `https://united-heaven.org/action/${actionId}`;
    const [liked, setLiked] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const shareToast = 'share-toast'
    const { onCopy } = useClipboard(shareUrl);
    const navigate = useNavigate();
    const { onAuthRun } = useContext(AuthContext);
    const { currentUser } = useContext(UserContext);

    const handleCardClick = () => {
        if (type === "action") {
            navigate(clickableCardUrl)
        } else {
            window.open(clickableCardUrl, '_blank');
        }
    }

    const handleShare = async () => {
        const shareData = {
            text: heading,
            url: shareUrl
        }
        try {
            await navigator.share(shareData)
        } catch (err) {

            if (err.name !== "AbortError") {
                try {
                    onCopy()
                    if (!toast.isActive(shareToast)) {
                        toast({
                            id: shareToast,
                            title: 'Copied to clipboard',
                            status: 'info',
                            duration: 4000,
                        })
                    }
                } catch (err) {
                    toast({
                        title: err,
                        status: 'error',
                        duration: 4000,
                    })
                }
            }
        }
    }


    const handleLike = () => {
        onAuthRun(async () => {
            setLiked(true);
            try {
                await likeAction({ "action_id": actionId, "user_id": currentUser.user_id });
            } catch (err) {
                setLiked(false);
            }
        });
    }

    const handleDislike = () => {
        onAuthRun(async () => {
            setLiked(false);
            try {
                await unLikeAction({ "action_id": actionId, "user_id": currentUser.user_id });
            } catch (err) {
                setLiked(true);
            }
        });
    }

    return (
        <>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                p={6}
                overflow={'hidden'}
            >
                {profile && (
                    <Box mb={4}>
                        <DisplayPic profile={profile} />
                    </Box>
                )}
                {image && (
                    <Image
                        src={image}
                        onClick={() => handleCardClick()}
                        layout={'fill'}
                        mb={4}
                        w="100%"
                        rounded={"lg"}
                    />
                )}
                <Stack spacing={2}>
                    <Flex justify={"space-between"} align="center">
                        <Text
                            color={findTypeColor(type)}
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}>
                            {type}
                        </Text>
                        {type === "action" && (
                            <Flex>
                                {
                                    liked ? (
                                        <CardOptions text="0" color="#F91C2D" selected onClick={handleDislike}>
                                            <ScaleFade initialScale={0.1} in={liked}>
                                                <IoIosHeart size={'1.5em'} />
                                            </ScaleFade>
                                        </CardOptions>
                                    ) : (
                                        <CardOptions text="0" color="#F91C2D" onClick={handleLike}>
                                            <IoIosHeartEmpty size={'1.5em'} />
                                        </CardOptions>
                                    )
                                }
                                <CardOptions color={colorMode === "light" ? "#319795" : "#4FD1C5"} onClick={handleShare}>
                                    <IoIosShareAlt size={'1.5em'} />
                                </CardOptions>
                            </Flex>
                        )}
                    </Flex>
                    <Box onClick={() => handleCardClick()} cursor={"pointer"}>
                        {heading && (
                            <Heading
                                size="2xl"
                                isExternal={type === "news" || type === "event"}
                            >
                                {heading}
                            </Heading>
                        )}
                        {para && (
                            <Text py={2} color={'gray.500'}>
                                {para}
                            </Text>
                        )}
                    </Box>
                    {sdgGoals && (
                        <SDGTags
                            goals={sdgGoals}
                        />
                    )}

                    {sdgTargets && (
                        <SDGTags
                            targets={sdgTargets}
                        />
                    )}

                    <Stack spacing={4} pt="5">

                        {isOnline && (
                            <List
                                icon={FaGlobeAmericas}
                                text='Online'
                            />
                        )}


                        {startDate && (
                            <List
                                icon={BsFillCalendarWeekFill}
                                text={`${startDate} - ${endDate}`}
                            />
                        )}



                        {location && (
                            <List
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank')}
                                icon={IoLocationSharp}
                                text={location}
                            />
                        )}

                        {url && (
                            <List
                                onClick={() => window.open(url, '_blank')}
                                icon={AiOutlineLink}
                                text={url}
                            />
                        )}



                    </Stack>


                </Stack>
                {footer && (
                    <HStack mt="2">
                        <Spacer />
                        {footer}
                    </HStack>
                )}
            </Box>
            <Divider />
        </>
    );

}

const CardOptions = ({ children, onClick, text, color, selected }) => {
    return (
        <Flex ml="6" align="center" color={selected && color} _hover={{ color: color }} cursor="pointer" onClick={onClick}>
            <Circle size="36px" _hover={{ bg: `${color}19` }}>
                {children}
            </Circle>
            {text && <Text ml="1" fontWeight="500" className='noselect'>{text}</Text>}
        </Flex>
    )
}

const List = ({ text, onClick, icon }) => {
    return (
        <Flex
            w="fit-content"
            align="center"
            color={'gray.500'}
            onClick={onClick}
            cursor={onClick && "pointer"}
            _hover={{
                color: onClick && 'white'
            }}
        >
            <Icon as={icon} fontSize={'1.5em'} />
            <Text fontSize={'sm'} ml="2" fontWeight={'600'}>
                {text}
            </Text>
        </Flex>
    )
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
    sdgGoals: PropTypes.arrayOf(PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])),
    buttonText: PropTypes.string,
    buttonOnClick: PropTypes.func,
    isOnline: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    location: PropTypes.string,
    url: PropTypes.string,
}



export default FeedCard;