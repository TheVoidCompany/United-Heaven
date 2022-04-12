import {
    Box, Button, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';



const categories = ["action", "news", "events"];

const goals = ["1", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];

const FeedFilter = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [goalFilters, setGoalFilters] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const url = location.pathname;
    const feedSubUrl = url.slice(5);
    const isActionFeed = feedSubUrl.includes("/actions");




    const handleApply = () => {

        onClose();
        let queryParams = "";
        if (categoryFilters.length > 0 && !isActionFeed) {
            queryParams += "category=" + categoryFilters.join(",");
        }
        if (goalFilters.length > 0) {
            if (queryParams.length > 0) {
                queryParams += "&goal=" + goalFilters.join(",");
            } else {
                queryParams += "goal=" + goalFilters.join(",");
            }
        }
        if (queryParams.length > 0) {
            if (isActionFeed) {
                navigate(`/feed/actions?${queryParams}`);
            } else {
                navigate(`/feed?${queryParams}`);
            }
        } else {
            if (isActionFeed) {
                navigate(`/feed/actions`);
            } else {
                navigate(`/feed`);
            }
        }

    }

    return (
        <Box
            ml="4"
            color={useColorModeValue('gray.400', 'gray.500')}
            _hover={{
                color: useColorModeValue('gray.800', 'gray.200'),
            }}
            cursor="pointer"
            onClick={onOpen}
        >
            <FaFilter fontSize={26} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Filters</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {!isActionFeed && (
                            <>
                                <Text fontWeight={"bold"} fontSize={"lg"} mb="3">Category</Text>
                                {categories.map((category) => {
                                    return (
                                        <Button
                                            key={category}
                                            mr="3"
                                            mb="3"
                                            cursor="pointer"
                                            variant="outline"
                                            _focus={{
                                                outline: 'none',
                                            }}
                                            boxShadow={categoryFilters.includes(category) ? "0px 0px 0px 3px rgba(66,152,225,0.8)" : "none"}
                                            onClick={() => {
                                                if (categoryFilters.includes(category)) {
                                                    setCategoryFilters(categoryFilters.filter(c => c !== category));
                                                } else {
                                                    setCategoryFilters([...categoryFilters, category]);
                                                }
                                            }}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </Button>
                                    )
                                })}
                            </>
                        )}
                        <Text fontWeight={"bold"} fontSize={"lg"} mt={!isActionFeed && "10"} mb="3">Goal</Text>
                        {goals.map((goal) => {
                            return (
                                <Button
                                    key={goal}
                                    mr="3"
                                    mb="3"
                                    cursor="pointer"
                                    variant="outline"
                                    _focus={{
                                        outline: 'none',
                                    }}
                                    boxShadow={goalFilters.includes(goal) ? "0px 0px 0px 3px rgba(66,152,225,0.8)" : "none"}
                                    onClick={() => {
                                        if (goalFilters.includes(goal)) {
                                            setGoalFilters(goalFilters.filter(c => c !== goal));
                                        } else {
                                            setGoalFilters([...goalFilters, goal]);
                                        }
                                    }}
                                >
                                    SDG {goal}
                                </Button>
                            )
                        })}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            w="100%"
                            onClick={handleApply}
                        >Apply</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default FeedFilter