import {
    Box,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import SocialButton from './SocialButton';


const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Text fontSize="3xl" fontWeight="500" fontFamily="Ailerons">United Heaven</Text>
                <Stack direction={'row'} spacing={6}>
                    <Link href={'/'}>Prime</Link>
                    <Link href={'/sight'}>Sight</Link>
                    <Link href={'/feed'}>Feed</Link>
                    <Link href={'#'}>Sponsor</Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2021 United Heaven. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'#'}>
                            <FaTwitter />
                        </SocialButton>
                        <SocialButton label={'Github'} href={'#'}>
                            <FaGithub />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'#'}>
                            <FaInstagram />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}


export default Footer;