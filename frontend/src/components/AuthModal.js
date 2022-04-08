import { useState } from 'react';
import UserLoginDetails from '../pages/auth/login/UserLoginDetails';
import UserSignupDetails from '../pages/auth/signup/UserSignupDetails';

import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

const AuthModal = ({ isOpen, onClose }) => {

    const [showLogin, setShowLogin] = useState(false);


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody padding={0}>
                    {showLogin
                        ? <UserLoginDetails onSignupClick={() => setShowLogin(false)} />
                        : <UserSignupDetails onLoginClick={() => setShowLogin(true)} />}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AuthModal