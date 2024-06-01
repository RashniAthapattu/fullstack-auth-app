import { ReactNode, createContext, useState } from 'react';
import { SignInFields } from '../types';
import request from 'modules/common/utils/request';
import API from '../constants';
import useAuth from 'modules/common/auth/context/useAuth';
import useNotification from 'modules/common/notifications/context/useNotification';

export type SignInStore = {
  loading: boolean;
  signIn: (values: SignInFields) => void;
};

const SignInContext = createContext<SignInStore>({} as SignInStore);

export const SignInProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const { setNotification } = useNotification();

  const signIn = async (values: SignInFields) => {
    try {
      setLoading(true);
      const response = await request(API.POST_SIGN_IN, values, false);
      setAuth({
        accessToken: response.accessToken as string,
        loading: false,
      });
    } catch (error: any) {
      setNotification(true, error.message.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInContext.Provider value={{ signIn, loading }}>
      {children}
    </SignInContext.Provider>
  );
};

export default SignInContext;
