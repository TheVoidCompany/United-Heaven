import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, useDisclosure
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';

const ActionFooterButton = ({ userId, actionId = "1", size = "md" }) => {

    const { onAuthRun, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    // const isOwnAction = userId === currentUser?.id;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const isOwnAction = true;


    if (!isAuthenticated) {
        return (
            <Button colorScheme='twitter' mr="4">Participate</Button>
        )
    }

    const handleParticipateClick = () => {
        onAuthRun(() => {
            console.log("hi")
        });
    }

    const handleDeleteClick = () => {
        console.log("hii")
        onClose()
    }

    const handleEditClick = () => {
        navigate(`/feed/actions/edit/${actionId}`)
    }


    return (
        <Flex>
            {!isAuthenticated || !isOwnAction ? (
                <Button _focus={{ outline: "none" }} size={size} colorScheme='twitter' mr="4" onClick={handleParticipateClick}>Participate</Button>
            ) : (
                <>
                    <Button _focus={{ outline: "none" }} size={size} mr="4" onClick={handleEditClick}>Edit Action</Button>
                    <Button _focus={{ outline: "none" }} size={size} variant={"ghost"} colorScheme={"red"} onClick={onOpen}>Delete Action</Button>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Delete Action
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You can't undo this action afterwards.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button _focus={{ outline: "none" }} ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button _focus={{ outline: "none" }} colorScheme='red' onClick={handleDeleteClick} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </>
            )}
        </Flex>
    )
}

export default ActionFooterButton