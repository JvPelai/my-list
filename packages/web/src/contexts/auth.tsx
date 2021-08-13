import { decode } from 'jsonwebtoken';
import React, { createContext, useEffect, useState } from 'react';

import User from '../interfaces/user';

export type IAuthContext = {
  signed: boolean;
  user: User | null;
  authToken?: string | null;
  logout?: () => void;
};

const AuthContext = createContext<IAuthContext>({
  signed: false,
  user: null
});

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const authToken = localStorage.getItem('user') as string;
    const decodedData = decode(authToken) as User;

    if (authToken && decodedData) {
      setToken(authToken);
      setUserData(decodedData);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(userData),
        user: userData,
        authToken: token,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
