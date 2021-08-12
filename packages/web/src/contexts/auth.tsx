import { decode } from 'jsonwebtoken';
import React, { createContext } from 'react';
import User from '../interfaces/user';

export type IAuthContext = {
  signed: boolean;
  user: User | null;
  authToken?: string;
};

const AuthContext = createContext<IAuthContext>({ signed: false, user: null });

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const authToken = localStorage.getItem('user') as string;
  const decodedData = decode(authToken) as User;

  return (
    <AuthContext.Provider
      value={{ signed: true, user: decodedData, authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
