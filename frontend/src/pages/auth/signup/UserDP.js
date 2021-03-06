import { Button, Flex, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import DefaultDP from '../../../images/defaultDP.jpeg';

const UserDP = ({ goNext, dpData, setDpData }) => {


    const [imgUrl, setImgUrl] = useState(null);
    const fileInputRef = useRef();

    const handleImage = (imageFile) => {
        setDpData(imageFile);
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
            setImgUrl(reader.result);
        };
    }

    return (
        <>
            <Stack spacing={2}>
                <Heading
                    color={'gray.800'}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Help others find you easily
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>

                    Click the display picture to chooose the new profile
                </Text>
            </Stack>
            <Flex align="center" h="100%" justify={"center"} direction={"column"}>
                <Image
                    cursor="pointer"
                    src={imgUrl}
                    fallbackSrc={DefaultDP}
                    bg="gray.400"
                    _hover={{ bg: "gray" }}
                    boxSize="200px"
                    rounded={"full"}
                    onClick={() => fileInputRef.current.click()}
                />

                <Input
                    display="none"
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                        handleImage(event.target.files[0])
                    }}
                />
            </Flex>
            <Button
                fontFamily={'heading'}
                py="4"
                bg={'gray.500'}
                color={'white'}
                onClick={() => goNext()}
                _hover={{
                    bg: 'gray.600',
                    boxShadow: 'xl',
                }}>
                Next
            </Button>
        </>
    )
}

export default UserDP

