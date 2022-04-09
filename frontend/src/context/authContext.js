import React from 'react';

const AuthContext = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => { },
    //shows authentication modal when isAuthenticated is false else run toRun function
    onAuthRun: (toRun) => { },
});

export { AuthContext };
