import useAuth from 'modules/common/auth/context/useAuth';

export const getAccessToken = () => {
  const { auth } = useAuth();
  return auth.accessToken;
};
