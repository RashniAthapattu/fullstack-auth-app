/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-useless-fragment */
import useAuthorization from '../../hooks/useAuthorization';
import { ReactNode, memo } from 'react';

type PropTypes = {
  children: ReactNode;
};

const AuthWrapper = memo(({ children }: PropTypes) => {
  const { isAuthenticated } = useAuthorization();

  return <>{isAuthenticated() && children}</>;
});

export default AuthWrapper;
