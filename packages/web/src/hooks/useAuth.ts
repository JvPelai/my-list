import { useContext } from 'react';
import AuthContext, { IAuthContext } from '../contexts/auth';

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  return context;
};
