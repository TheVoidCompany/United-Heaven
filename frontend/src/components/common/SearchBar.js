import { Box, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

const SearchBar = () => {


    return (
        <Flex w="100%">
            <Menu matchWidth={true} isLazy>
                <MenuButton width={"100%"}>
                    <Input variant='filled' placeholder='Search for actions, users...' rounded={"full"} />
                </MenuButton>
                <MenuList maxW={"fit-content"} maxH="50vh" overflow={"scroll"}>
                    <MenuItem py="4">
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='https://placekitten.com/100/100'
                            alt='Fluffybuns the destroyer'
                            mr='12px'
                        />
                        <Text fontWeight={"600"}>josh bush</Text>
                    </MenuItem>
                    <MenuItem py="4">
                        <Box mr='12px'>
                            <IoSearch
                                size={"2rem"}
                            />
                        </Box>
                        <Box>
                            <Text
                                color={'green.500'}
                                textTransform={'uppercase'}
                                fontWeight={800}
                                fontSize={'xs'}
                                letterSpacing={1.1}>
                                Action
                            </Text>
                            <Text fontWeight={"600"} noOfLines={2}>Clean Marina Beach on 12 dec morning Clean Marina Beach on 12 dec morning</Text>
                        </Box>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>

    )
}


export default SearchBar