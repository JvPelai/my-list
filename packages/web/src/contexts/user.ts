import { createContext } from 'react';
import User from '../interfaces/user';

type IUserContext = {
  userData: User | null;
};

const UserContext = createContext<IUserContext>({
  userData: null
});

export default UserContext;
