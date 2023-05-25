import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, login } from '../services/AuthService';
import FullScreenLoading from '../components/FullScreenLoading';
// import { AuthService } from "../services/AuthService";
import { IUser } from '../types/user';
import { useNotification } from './NotificationsProvider';

interface IAuthContext {
  user: IUser | undefined;
  logIn: (creds: IUser) => void;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { createNotification } = useNotification();

  const [ user, setUser ] = useState<IUser | undefined>(undefined);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserFromSession = () => {
      const sessionPresent = getSession();
      if (!sessionPresent) {
        return null;
      }
      // const user = (await UserService.getUser()).data;
      // setUser(user)
    };
    getUserFromSession();
  }, []);

  const logIn = useCallback(async (creds: IUser) => {
    try {
      setIsLoading(true);
      const user = await login(creds);
      console.log(`data :::`, user);
      if (user) {
        setUser(user);
      }
      setIsLoading(false);
      navigate(`/`);
    } catch (e: any) {
      setIsLoading(false);
      createNotification({
        message: e.response.data.message || e.message,
        type: `error`
      });
    }
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    navigate(`/login`);
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <AuthContext.Provider value={{ logIn, user, logout }}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }
  return context;
};
