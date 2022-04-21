import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Footer from "../../components/common/Footer";
import Features from "./Features";
import Hero from "./Hero";
import TwoColumnFeature from "./TwoColumnFeature";

const Study = () => {



    return (
        <Box
            h="40vh"
        >
            <Hero />
            <Box mt={{ base: 50, md: 100, lg: 200 }} />
            <TwoColumnFeature />
            <Box mt={{ base: 50, md: 100, lg: 200 }} />
            <Features stats={stats} />
            <Footer />
        </Box>
    )
}

export default Study

const StatsText = ({ children }) => {

    const themeColor = useColorModeValue('gray.800', '#fff');

    return (
        <Text as={'span'} fontWeight={700} color={themeColor}>
            {children}
        </Text>
    )

};

const stats = [
    {
        title: 'Ml',
        content: (
            <>
                <StatsText>Machine learning</StatsText> model is used to
                recommended the best way to solve the SDG goals
            </>
        ),
    },
    {
        title: 'GraphDB',
        content: (
            <>
                <StatsText>Tiger graph</StatsText> graph database is used to
                analyze the data in blazing speed
            </>
        ),
    },
    {
        title: 'Mapbox',
        content: (
            <>
                <StatsText>Mapbox</StatsText> api is used to visualize the
                data in a beautiful and interactive way
            </>
        ),
    },
    {
        title: 'UI',
        content: (
            <>
                <StatsText>React </StatsText> library is used to build user friendly
                and interactive UI for better user experience
            </>
        ),
    },
];