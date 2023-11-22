import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import instance from '../apis/instance';
import { useUserState } from './stores';

export const AuthContext = createContext<{
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}>({
  token: undefined,
  setToken: () => {
    throw new Error('setToken function must be overridden');
  },
});

export interface AuthProviderProps {
  children: ReactNode;
}

const mockAuthUser = (token: string) => ({
  name: 'hi',
  email: '',
  profileImage: '',
});

function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [token, setToken_] = useState(
    localStorage.getItem('token') || undefined,
  );

  const { removeUser, setUser } = useUserState();

  const setToken = (token: string | undefined) => {
    setToken_(token);
  };

  useEffect(() => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete instance.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      removeUser();
      return;
    }
    const userData = mockAuthUser(token);
    if (userData) setUser(userData);
  }, []);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
