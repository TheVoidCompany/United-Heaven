import React from 'react';

const UserContext = React.createContext({
    currentUser: {},
    setCurrentUser: (currentUserData) => { },
});

export { UserContext };
