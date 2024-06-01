import ROUTES from 'modules/common/constants/route';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from './useIsAuthenticated';
import useAuth from '../context/useAuth';

const useAuthorization = () => {
  const { isAuthenticated } = useIsAuthenticated();

  const navigate = useNavigate();

  const { refreshToken, logout } = useAuth();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated()) {
        try {
          await refreshToken();
        } catch (error) {
          await logout();
        }
      }
    })();
  }, [isAuthenticated]);
  return { isAuthenticated };
};

export default useAuthorization;
