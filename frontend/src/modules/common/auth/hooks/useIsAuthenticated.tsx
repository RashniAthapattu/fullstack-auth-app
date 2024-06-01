import { useCallback } from 'react';
import useAuth from '../context/useAuth';

const useIsAuthenticated = () => {
  const { auth } = useAuth();
  const isAuthenticated = useCallback(() => {
    if (auth.accessToken) {
      return true;
    }
    return false;
  }, [auth.accessToken]);

  return { isAuthenticated };
};

export default useIsAuthenticated;
