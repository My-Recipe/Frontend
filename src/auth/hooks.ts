import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '.';
import { UserSetPropType, useUserState } from './stores';

export const useAuth = () => {
  const { removeUser, setUser } = useUserState();
  const { token, setToken } = useContext(AuthContext);

  const setLogin = (user: UserSetPropType & { token: string }) => {
    setUser(user);
    setToken(user.token);
  };

  const setLogout = () => {
    removeUser();
    setToken(undefined);
  };

  const updateToken = (token: string) => setToken(token);

  return { token, setLogin, setLogout, updateToken };
};

export const useCurrentUser = ({
  redirectTo = '',
  redirectIfFound = false,
} = {}) => {
  const { user } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      navigate(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user };
};
