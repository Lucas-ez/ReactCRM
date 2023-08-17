import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { login, logout, getCurrentUser } from '../services/authService';

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const user = getCurrentUser();
      if (user) {
        setUser(user);
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (username, password) => {
    const { isOk, error } = await login(username, password);

    if(!isOk) {      
      const user = getCurrentUser();
      setUser(user);
    }

    return {
      isOk,
      error
    };
  }, []);

  const signOut = useCallback(() => {
    console.log("logout");
    logout();
    setUser(undefined);
  }, []);


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }