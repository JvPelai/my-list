import { createContext } from 'react';
import User from '../interfaces/user';

export type IUserContext = {
  userData: User | null;
};

const userContext = createContext<IUserContext>({
  userData: null
});

export default userContext;
