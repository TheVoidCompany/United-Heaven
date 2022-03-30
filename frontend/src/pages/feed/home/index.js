import { Box } from "@chakra-ui/react";
import ActionCard from "../../../components/cards/ActionCard";
import ThreeColumnStructure from "../../../components/ThreeColumnStructure";

const Home = () => {
    return (
        <ThreeColumnStructure>
            <Box p={4}>
                Follow Goals
            </Box>
            <div>
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
            </div>
            <Box p={4}>
                Trending
            </Box>
        </ThreeColumnStructure>
    )
}

export default Home