/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { IRegistration } from '../pages/Form/Register/FormValidation';

type UseUserReturn = {
  createUser: (data: IRegistration) => Promise<unknown>;
  loginUser: (data: any) => Promise<unknown>;
};

const useUser = (): UseUserReturn => {
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

  const loginUser = async (data: any): Promise<unknown> => {
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const userAuthToken = await instance.post('/users/auth', data);
    return userAuthToken;
  };

  return { createUser, loginUser };
};

export default useUser;
