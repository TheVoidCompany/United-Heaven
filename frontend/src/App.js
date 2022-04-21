import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import AuthModal from './components/AuthModal';
import { AuthContext } from './context/authContext';
import { UserContext } from './context/userContext';
import Router from './router/Router';
import { getUserFollowingGoals } from './services/GoalService';
import { getUser } from './services/UserService';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);


  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem('userId');
      getUser(userId).then(response => {
        setCurrentUser(response.data);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (currentUser.user_id) {
      getUserFollowingGoals(currentUser.user_id).then(response => {
        setCurrentUser({
          ...currentUser,
          following_goals: response.data
        });
      });
    }
  }, [currentUser])



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
        currentUser: currentUser,
        setCurrentUser: (currentUserData) => { },
      }}>
        <Router />
        <AuthModal onClose={onClose} isOpen={isOpen} />
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
