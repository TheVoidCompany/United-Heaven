import { Box, Divider, Flex, Hide, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import './styles.css';

const ThreeColumnStructure = ({ children }) => {


    return (
        <Flex minH="82vh">
            <Hide below="md">
                <Flex w={{ base: "320px", lg: "290px", xl: "380px", "2xl": "400px" }}>
                    <FixedCard id="fixedcard1">
                        {children[0]}
                    </FixedCard>
                    <Spacer />
                    <Divider orientation='vertical' />
                </Flex>
            </Hide>
            <Flex bg="yellow" flex={2} direction="column">
                {children[1]}
            </Flex>
            <Hide below="lg">
                <Flex w={{ base: "300px", lg: "320px", xl: "380px", "2xl": "400px" }}>
                    <Divider orientation='vertical' />
                    <FixedCard id="fixedcard2">
                        {children[2]}
                    </FixedCard>
                </Flex>
            </Hide>
        </Flex>
    )
}

const FixedCard = ({ id, children }) => {

    useEffect(() => {
        //show and hide the navbar on scroll down and up respectively
        let lastScrollTop = 0;
        const handleScroll = () => {

            //get navbar
            const fixedcard1 = document.getElementById('fixedcard1');
            const fixedcard2 = document.getElementById('fixedcard2');

            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                fixedcard1.style.top = '8vh';
                fixedcard2.style.top = '8vh';
            } else {
                fixedcard1.style.top = '16vh';
                fixedcard2.style.top = '16vh';
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, []);


    return (
        <Box
            id={id}
            position="fixed"
            width="inherit"
            className="fixedTransistion"
            top="16vh"
        >
            {children}
        </Box>
    )
}

export default ThreeColumnStructure