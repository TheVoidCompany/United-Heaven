import {
    Avatar, Box, Button, Divider, Flex, Heading, Input, Text
} from '@chakra-ui/react';


const EditProfile = () => {

    return (
        <Flex width="100%" direction="column" mt="50px">
            <Box px="10%">
                <Heading as="h1" size="lg">Edit Profile</Heading>
                <Text>Update your photos and personal details here</Text>
            </Box>
            <Flex py="2" px="10%" align="center" justifyContent="space-between" mr="10">
                <Box>
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
            <Divider my="4" />
            <Flex py="2" px="10%" align="center" justifyContent="space-between" mr="10">
                <Text
                    fontWeight="bold"
                >Username</Text>
                <Input
                    variant="filled"
                    placeholder='Enter name'
                    w="40%"

                />
            </Flex>
            <Flex mt="8" px="10%" justify="end" mr="10">
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
        </Flex>
    )
}

export default EditProfile


