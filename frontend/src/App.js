import { useDisclosure } from '@chakra-ui/react';
import AuthModal from './components/AuthModal';
import { AuthContext } from './context/authContext';
import { UserContext } from './context/userContext';
import Router from './router/Router';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = true;

  const onAuthRun = (toRun) => {
    if (isAuthenticated) {
      toRun();
    } else {
      onOpen();
    }
  }


  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated,
      setIsAuthenticated: (isAuthenticated) => { },
      onAuthRun: (toRun) => { onAuthRun(toRun) },
    }}>
      <UserContext.Provider value={{
        currentUser: {},
        setCurrentUser: (currentUserData) => { },
      }}>
        <Router />
        <AuthModal onClose={onClose} isOpen={isOpen} />
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
