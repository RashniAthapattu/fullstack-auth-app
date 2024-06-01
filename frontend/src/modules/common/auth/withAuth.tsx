import useAuthorization from './hooks/useAuthorization';

const withAuth = (Component: React.FC) => {
  const Auth = (props: any) => {
    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated()) {
      return <> </>;
    }

    return <Component {...props} />;
  };
  return Auth;
};

export default withAuth;
