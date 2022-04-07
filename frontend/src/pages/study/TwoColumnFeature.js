import {
    Container, Flex,
    Heading, Icon, SimpleGrid, Stack,
    StackDivider, Text, useColorModeValue
} from '@chakra-ui/react';
import { FaDatabase } from 'react-icons/fa';
import {
    IoAnalyticsSharp,
    IoSearchSharp
} from 'react-icons/io5';
import SdgGraph from '../../components/SdgGraph';
import { SDGGoals } from '../../constants/SDGGoals';
import { SDGRelation } from '../../constants/SDGRelation';

const maxNodeSize = 80;


const nodes = SDGGoals.map(SDGGoal => {
    return {
        id: SDGGoal.id,
        label: SDGGoal.id,
        labelCfg: {
            position: 'center',
            style: {
                fill: SDGGoal.color,
                // fontStyle: 'bolder',
                fontSize: 12,
                fontFamily: 'Play'

            },
        },
    }
});

nodes.push({
    id: "0",
    label: "SDG Goals",
    style: {
        "stroke": "rgba(95, 149, 255, 0.5)",
        "lineWidth": 2,
    },
    labelCfg: {
        position: 'center',
        style: {
            fill: '#000000CC',
            fontStyle: 'bolder',
            fontFamily: 'Play',
            fontSize: 12

        },
    },
    size: maxNodeSize
});


const edges = SDGRelation.map(SDGRelation => {
    return {
        source: SDGRelation.sourceGoal,
        target: SDGRelation.targetGoal,
    }
});

SDGGoals.forEach(goal => {
    edges.push({
        source: "0",
        target: goal.id
    })
})


const TwoColumnFeature = () => {

    return (
        <Container maxW={'5xl'} py={14}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        SDG Connection
                    </Text>
                    <Heading>Interconnection between SDG Goals</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        SDG goals are interconnected through complex relationship and
                        are capable of solving each other
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={
                                <Icon as={FaDatabase} color={'yellow.500'} w={4} h={4} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Data from Multiple Resources'}
                        />
                        <Feature
                            icon={<Icon as={IoSearchSharp} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Manual Research on SDG Reports'}
                        />
                        <Feature
                            icon={
                                <Icon as={IoAnalyticsSharp} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Time-Series Analysis on SDG Goals'}
                        />
                    </Stack>
                </Stack>
                <Flex id="mountSdgGraph">
                    <Flex align="center" justify="center" w={'full'}>
                        <SdgGraph nodes={nodes} edges={edges} maxNodeSize={maxNodeSize} />
                    </Flex>
                </Flex>
            </SimpleGrid>
        </Container>
    );
}




const Feature = ({ text, icon, iconBg }) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};


export default TwoColumnFeature;