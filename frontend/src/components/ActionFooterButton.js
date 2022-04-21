import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Button, Flex, useDisclosure, useToast
} from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import { deleteAction, participateInAction, unParticipateInAction } from '../services/ActionService';

const ActionFooterButton = ({ creatorId, actionId, size = "md" }) => {

    const { onAuthRun, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const isOwnAction = creatorId === currentUser?.user_id;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isParticipated, setisParticipated] = useState(false);
    const cancelRef = useRef();
    const toast = useToast();


    const handleParticipateClick = () => {
        onAuthRun(async () => {
            setisParticipated(true);
            try {
                await participateInAction({ "action_id": actionId, "user_id": currentUser.user_id });
                setisParticipated(true);
            } catch (error) {
                setisParticipated(false);
            }
        });
    }

    const handleLeaveClick = () => {
        onAuthRun(async () => {
            setisParticipated(false);
            try {
                await unParticipateInAction({ "action_id": actionId, "user_id": currentUser.user_id });
                setisParticipated(false);
            } catch (error) {
                setisParticipated(true);
            }
        });
    }

    const handleDeleteClick = async () => {
        const response = await deleteAction(actionId);
        if (response.status === 200) {
            toast({
                title: "Action deleted",
                description: "The action has been deleted",
                status: "success",
                duration: 6000,
            });
            navigate("/feed");
        } else {
            toast({
                title: "Action not deleted",
                description: "The action could not be deleted",
                status: "error",
                duration: 6000,
            });
        }
        onClose()
    }

    const handleEditClick = () => {
        navigate(`/feed/actions/edit/${actionId}`)
    }


    return (
        <Flex>
            {!isAuthenticated || !isOwnAction ? (
                <Button
                    _focus={{ outline: "none" }}
                    size={size}
                    colorScheme='twitter'
                    mr="4"
                    onClick={isParticipated ? handleLeaveClick : handleParticipateClick}>
                    {isParticipated ? "Leave" : "Participate"}
                </Button>
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