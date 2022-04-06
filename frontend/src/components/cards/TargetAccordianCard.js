import { Collapse, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getTargetsAndIndicatorsByGoalId } from '../../services/SDGService';

const TargetAccordianCard = ({ goalId }) => {

    const [targetsAndIndicators, setTargetsAndIndicators] = useState(null);

    useEffect(() => {

        getTargetsAndIndicatorsByGoalId(goalId).then(response => {
            setTargetsAndIndicators(response);
            console.log(response);
        });

    }, [goalId]);

    if (!targetsAndIndicators) {
        return null;
    }

    return (
        targetsAndIndicators && targetsAndIndicators[0].targets.map(target => {
            return (
                <AccordianCard key={target.code} target={target} />
            )
        })
    )
}

const AccordianCard = ({ target }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack borderRadius="sm" align={"start"}>
            <Stack
                p="6"
                px={{ base: "6", lg: "12" }}
                direction="column"
                alignItems="start"
                onClick={onToggle}
                w="100%"
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack direction={"row"} align="center" justify={"space-between"} w="100%">
                    <Text color={'gray.600'} fontWeight="semibold">Target</Text>
                    {isOpen ? <IoIosArrowUp fontSize={23} /> : <IoIosArrowDown fontSize={23} />}
                </Stack>
                <Stack direction={{ base: "column", lg: "row" }} align={{ base: "Start", lg: "center" }}>
                    <Text fontWeight="900" fontSize={"4xl"} mr="4">{target.code}</Text>
                    <Text fontSize={{ base: 'md' }} fontWeight="semibold" textAlign={'left'} >
                        {target.description}
                    </Text>
                </Stack>
            </Stack>
            <Collapse in={isOpen} animateOpacity>
                <Stack
                    p="6"
                    px={{ base: "6", lg: "12" }}
                    justifyContent="space-between">
                    <Text color={'gray.600'} fontWeight="semibold">Indicator</Text>
                    {target.indicators.map(indicator => {
                        return (
                            <Stack direction={{ base: "column", lg: "row" }} align={{ base: "Start", lg: "center" }}>
                                <Text fontWeight="700" fontSize={"2xl"} mr="4">{indicator.code}</Text>
                                <Text fontSize={{ base: 'sm' }} fontWeight="semibold" textAlign={'left'} >
                                    {indicator.description}
                                </Text>
                            </Stack>
                        )
                    })}
                </Stack>
            </Collapse>
        </Stack>
    )
}

TargetAccordianCard.propTypes = {
    goalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TargetAccordianCard;