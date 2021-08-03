import axios from 'axios';
import { IRegistration } from '../pages/Register/FormValidation';

type UseUserReturn = {
  createUser: (data: IRegistration) => Promise<unknown>;
};

const useUser = (): UseUserReturn => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createUser = async (data: any): Promise<unknown> => {
    const instance = axios.create({
      baseURL: 'http://localhost:8000'
    });
    const user = await instance.post('/users', data);
    return user.data;
  };

  return { createUser };
};

export default useUser;
