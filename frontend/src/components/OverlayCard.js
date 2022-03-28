import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";


const OverlayCard = ({ children, position, title, closeButton, onClose, customStyles, titleLg }) => {

    const popupColor = useColorModeValue('#F6FBFFEE', '#061626EE');

    return (
        <Box
            bg={popupColor}
            zIndex={2}
            position="absolute"
            {...position}
            p="4"
            margin="6"
            borderRadius={6}
            {...customStyles}
        >
            {title && (
                <Flex mb={children ? '4' : '0'} justifyContent='space-between' alignItems="center">
                    <Text fontSize={titleLg ? '3xl' : '2xl'} fontWeight='bold'> {title} </Text>
                    {closeButton && (<IoClose cursor='pointer' size={titleLg ? "30" : "26"} onClick={onClose} />)}
                </Flex>
            )}
            {children}
        </Box>
    )
}

OverlayCard.defaultProps = {
    position: {
        top: '0'
    }
}

OverlayCard.propTypes = {
    children: PropTypes.node,
    position: PropTypes.shape({
        top: PropTypes.string || PropTypes.number,
        left: PropTypes.string || PropTypes.number,
        right: PropTypes.string || PropTypes.number,
        bottom: PropTypes.string || PropTypes.number
    }),
    title: PropTypes.string,
    closeButton: PropTypes.bool,
    onClose: PropTypes.func,
    customStyles: PropTypes.object,
    titleLg: PropTypes.bool
};

export default OverlayCard