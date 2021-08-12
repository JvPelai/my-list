/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import User from '../interfaces/user';
import { IRegistration } from '../pages/Form/Register/FormValidation';

type UseUserReturn = {
  userData: null | User;
  setUserData: Dispatch<SetStateAction<User | null>>;
  createUser: (data: IRegistration) => Promise<unknown>;
  loginUser: (data: any) => Promise<string | any>;
};

const useUser = (): UseUserReturn => {
  const [userData, setUserData] = useState<null | User>(null);

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
    localStorage.setItem('user', authData);

    return authData;
  };

  return { userData, setUserData, createUser, loginUser };
};

export default useUser;
