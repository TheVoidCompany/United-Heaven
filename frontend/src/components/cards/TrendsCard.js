import {
    Box, Flex, Icon, Image
} from '@chakra-ui/react';
import { BsFillCircleFill } from 'react-icons/bs';
import { ImArrowDown2, ImArrowRight2, ImArrowUp2, ImArrowUpRight2 } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


const TrendsCard = ({ goalId, ratingValue, trendValue, countryIso }) => {

    const navigate = useNavigate();

    const TrendArrow = () => {
        if (trendValue === "Up") {
            return <Icon as={ImArrowUp2} h={7} w={7} color={'green.500'} />
        } else if (trendValue === "Down") {
            return <Icon as={ImArrowDown2} h={7} w={7} color={'red.500'} />
        } else if (trendValue === "Up Right") {
            return <Icon as={ImArrowUpRight2} h={7} w={7} color={'yellow.500'} />
        } else if (trendValue === "Right") {
            return <Icon as={ImArrowRight2} h={7} w={7} color={'orange.500'} />
        } else {
            return <Icon as={IoCloseSharp} h={7} w={7} color={'gray.500'} />
        }
    }

    const ratingColorValue = () => {
        if (ratingValue === "achieved") {
            return "green.500"
        } else if (ratingValue === "remain") {
            return "yellow.500"
        } else if (ratingValue === "significant remain") {
            return "orange.500"
        } else if (ratingValue === "Major remain") {
            return "red.500"
        } else {
            return "gray.500"
        }
    }



    return (
        <Flex
            pb={6}
            w="full"
            alignItems="center"
            justifyContent="center"
            onClick={() => navigate(`/profiles/${countryIso}/goal${goalId}`)}
            cursor="pointer"
        >
            <Box
                maxW="sm"
                minW="180px"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                _hover={{
                    shadow: 'xl',
                    transform: 'translateY(-2px)',
                }}
            >
                <Image
                    src={require(`../../images/SDGIcons/Goal${goalId}.png`)}
                    roundedTop="lg"
                    boxSize={"180px"}
                />

                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Icon as={BsFillCircleFill} h={7} w={7} color={ratingColorValue} />
                        <TrendArrow />
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default TrendsCard