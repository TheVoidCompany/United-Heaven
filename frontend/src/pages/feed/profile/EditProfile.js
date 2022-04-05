import {
    Avatar, Box, Button, Flex, Heading, Input, Text
} from '@chakra-ui/react';


const EditProfile = () => {

    return (
        <Flex width="100%" direction="column" mt="50px" px={{ base: "5%", md: "10%" }}>

            <Box>
                <Heading as="h1" size="lg">Edit Profile</Heading>
                <Text>Update your photos and personal details here</Text>
            </Box>
            <Box px={{ base: "0%", md: "10%" }} mt="10">
                <Flex py="8" mb="6" direction={"column-reverse"} align="center">
                    <Box textAlign={"center"} mt="3">
                        <Text
                            fontWeight="bold"
                        >Display Picture</Text>
                        <Text

                        >Click the display picture to chooose the new profile</Text>
                    </Box>

                    <Avatar cursor="pointer" src={'https://avatars.dicebear.com/api/male/username.svg'} _hover={{ bg: "gray" }} size="2xl" />
                    <Input
                        display="none"
                        type="file"
                        accept="image/png, image/jpeg"
                    />
                </Flex>
                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Name</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter name'
                        w="60%"

                    />
                </Flex>
                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Twitter Url</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter twitter url'
                        w="60%"

                    />
                </Flex>
                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Facebook Url</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter facebook url'
                        w="60%"

                    />
                </Flex>

                <Flex py="6" direction={"row"} justifyContent="space-between">
                    <Text
                        fontWeight="bold"
                    >Instagram Url</Text>
                    <Input
                        variant="filled"
                        placeholder='Enter instagram url'
                        w="60%"

                    />
                </Flex>


                <Flex my="8" justify="end">
                    <Button
                        variant="solid"
                        colorScheme='teal'
                        _focus={{
                            boxShadow: '0 0 1px 1px #cccccc',
                        }}
                    >
                        Save Changes
                    </Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default EditProfile


