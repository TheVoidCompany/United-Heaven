import { Flex, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { findTypeColor } from '../../utils/common';
import Heading from '../common/Heading';

const ColumnCard = ({ type, heading, image, clickableCardUrl }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        if (type === "action") {
            navigate(clickableCardUrl)
        } else {
            window.open(clickableCardUrl, '_blank');
        }
    }

    return (
        <Flex p={5}
            cursor="pointer"
            onClick={handleCardClick}
            _hover={{
                backgroundColor: useColorModeValue('gray.100', 'gray.800')
            }}
            justifyContent="space-between"
        >
            <Stack alignSelf="flex-start">
                <Text
                    color={findTypeColor(type)}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize="12"
                    letterSpacing={1.1}
                >

                    {type}

                </Text>
                <Heading
                    size="md"
                    customStyles={{ noOfLines: 3 }}
                    isExternal={type === "news" || type === "event" || type === "charity"}
                >
                    {heading}
                </Heading>
            </Stack>
            {image && (
                <Image
                    src={image}
                    boxSize='100px'
                    objectFit={'cover'}
                    objectPosition="center center"
                    rounded={'lg'}
                    ml="4"

                />
            )}
        </Flex>
    )
}

export default ColumnCard