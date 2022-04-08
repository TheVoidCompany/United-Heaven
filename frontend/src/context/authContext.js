import React from 'react';

const AuthContext = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => { },
    onAuthRun: () => { },
});

export { AuthContext };
