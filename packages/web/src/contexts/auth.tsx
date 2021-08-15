/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { decode } from 'jsonwebtoken';
import React, { createContext, useEffect, useState } from 'react';

import User from '../interfaces/user';
import { IRegistration } from '../pages/Form/Register/FormValidation';

export type IAuthContext = {
  signed: boolean;
  user: User | null;
  createUser: (data: IRegistration) => Promise<unknown>;
  loginUser: (data: any) => Promise<string | any>;
  authToken: string | null;
  logout: () => void;
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const authToken = localStorage.getItem('user') as string;
    const decodedData = decode(authToken) as User;
    const { exp } = decodedData;
    const currentTime = Date.now() / 1000;
    const isExpired = (exp as number) < currentTime;

    if (authToken && decodedData && !isExpired) {
      setToken(authToken);
      setUserData(decodedData);
    }
  }, []);

  const createUser = async (data: any): Promise<unknown> => {
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const user = await instance.post('/users', data);
    return user.data;
  };

  const loginUser = async (data: any): Promise<string | null> => {
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const userAuthToken = await instance.post('/users/auth', data);
    const authData = userAuthToken.data;
    setUserData(authData);
    localStorage.setItem('user', authData as string);

    return authData;
  };
  const logout = () => {
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(userData),
        user: userData,
        authToken: token,
        createUser,
        loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
