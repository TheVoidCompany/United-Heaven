import { Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRef } from 'react';

const SearchBar = () => {

    const menuButtonRef = useRef();

    return (
        <Flex w="100%">
            <Input onFocus={() => menuButtonRef.current.click()} variant='filled' placeholder='Search for actions, users...' rounded={"full"} />
            <Menu matchWidth={true}>
                <MenuButton >
                    <Button ref={menuButtonRef} display="none" />
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='https://placekitten.com/100/100'
                            alt='Fluffybuns the destroyer'
                            mr='12px'
                        />
                        <span>Fluffybuns the Destroyer</span>
                    </MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
            </Menu>
        </Flex>

    )
}

export default SearchBar