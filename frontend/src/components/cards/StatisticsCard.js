import {
  Box, Container, Flex, Grid,
  GridItem, Heading, Text
} from '@chakra-ui/react';

const StatisticsCard = () => {
  return (
    <Container py={5} maxW={'container.lg'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={10}>
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
          <Heading as={'h2'}>Overview</Heading>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>
              30%
            </Text>
            <Box fontSize={'sm'} fontWeight={"500"}>
              of the citizens of india don't have access to fresh water.
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>
              142,000
            </Text>
            <Box fontSize={'sm'} fontWeight={"500"}>
              people are suffering from hunger.
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default StatisticsCard;