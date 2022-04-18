import {
    chakra, Text, useColorModeValue,
    VisuallyHidden
} from '@chakra-ui/react';

const SocialButton = ({
    children,
    label,
    lg,
    circle,
    href,
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            px={circle ? "2" : "5"}
            py="2"
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
            {lg === true && <Text ml="2">{label}</Text>}
        </chakra.button>
    );
};

export default SocialButton;