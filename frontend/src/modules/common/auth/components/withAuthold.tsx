import { FC } from 'react';
import useAuthorization from '../hooks/useAuthorization';

const withAuth = (Component: any) => {
  const { isAuthenticated } = useAuthorization();

  // eslint-disable-next-line react/display-name
  return () => {
    return (
      <div>{isAuthenticated() ? <Component /> : <h1>Not Authorized</h1>}</div>
    );
  };
};

export default withAuth;
