import { Heading as Head, useColorModeValue } from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';

const Heading = ({ children, size = "2xl", customStyles, isExternal }) => {
    return (
        <Head
            color={useColorModeValue('gray.700', 'white')}
            fontSize={size}
            fontFamily={'body'}
            {...customStyles}
        >
            {children}
            {isExternal && (
                <BiLinkExternal
                    size="18"
                    style={{
                        display: "inline",
                        textAlign: "center",
                        marginLeft: "2",
                        paddingTop: "4",
                    }}
                />
            )}
        </Head>
    )
}

export default Heading