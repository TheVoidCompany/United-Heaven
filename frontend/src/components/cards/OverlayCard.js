import { Box, Divider, HStack, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { IoChevronBackOutline, IoClose } from "react-icons/io5";
var isEqualWith = require('lodash.isequalwith');

const OverlayCard = ({ children, position, title, onClose, onBack, customStyles, width, divider, isSmallSize, titleOnClick }) => {

    const popupColor = useColorModeValue('#F6FBFFEE', '#061626EE');

    return (
        <Box
            bg={popupColor}
            zIndex={20}
            position="absolute"
            {...position}
            p="4"
            margin={isSmallSize ? "0" : "30px"}
            borderRadius={6}
            minW={isSmallSize ? "100vw" : width}
            maxW={isSmallSize ? "100vw" : width}
            {...customStyles}
        >
            {title && (
                <>
                    <HStack mb={2}>
                        {onBack && (<IoChevronBackOutline cursor='pointer' size={"26"} onClick={onBack} />)}
                        <Text onClick={() => titleOnClick && titleOnClick()} cursor={titleOnClick && "pointer"} ml={onBack && "10px"} fontSize={'2xl'} fontWeight='bold' noOfLines={1} maxW={width ? width / 1.5 : "260px"}>{title}</Text>
                        <Spacer />
                        {onClose && (<IoClose cursor='pointer' size={"26"} onClick={onClose} />)}
                    </HStack>
                    {divider && <Divider mb={children ? '4' : '0'} />}
                </>
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
    onClose: PropTypes.func,
    customStyles: PropTypes.object,
    onBack: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    divider: PropTypes.bool,
    isSmallSize: PropTypes.bool,
    titleOnClick: PropTypes.func
};

const isPropsEqual = (prevProps, nextProps) => {
    return isEqualWith(prevProps, nextProps)
}

export default memo(OverlayCard, isPropsEqual)