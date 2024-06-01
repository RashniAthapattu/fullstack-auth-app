import { ReactNode, createContext, useState } from 'react';
import { SignUpFields } from '../types';
import request from 'modules/common/utils/request';
import API from '../constants';
import useAuth from 'modules/common/auth/context/useAuth';
import useNotification from 'modules/common/notifications/context/useNotification';

export type SignUpStore = {
  loading: boolean;
  signUp: (values: SignUpFields) => void;
};

const SignUpContext = createContext<SignUpStore>({} as SignUpStore);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const { setAuth } = useAuth();

  const signUp = async (values: SignUpFields) => {
    try {
      setLoading(true);
      const response = await request(API.POST_SIGN_UP, values, false);
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
    <SignUpContext.Provider value={{ signUp, loading }}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContext;
