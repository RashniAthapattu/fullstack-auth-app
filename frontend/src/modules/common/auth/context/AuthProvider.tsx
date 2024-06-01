import request from 'modules/common/utils/request';
import { ReactNode, createContext, useState } from 'react';
import API from '../constants';
// import { AuthState } from "../types/auth.type";

type AuthState = {
  accessToken?: string;
  loading: boolean;
};

export interface AuthStore {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  refreshToken: () => Promise<void>;
  logout: VoidFunction;
}

const AuthContext = createContext<AuthStore>({} as AuthStore);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({} as AuthState);

  const logout = async () => {
    try {
      console.log('Logging out...', auth);
      setAuth({ ...auth, loading: true });      
      await request(API.POST_SIGN_OUT, null, false);
      setAuth({ ...auth, loading: false, accessToken: '' });
      console.log('Logged out', auth);
    } catch (error) {
      console.error('Error logging out:', error);
      setAuth({ ...auth, loading: false });
    }
  };

  const refreshToken = async () => {
    try {
      setAuth({ ...auth, loading: true });
      const response = await request(API.POST_REFRESH_TOKENS, null, false);
      setAuth({ ...auth, loading: false, accessToken: response.accessToken });
    } catch (error: any) {
      setAuth({ ...auth, loading: false, accessToken: '' });
      console.log('throwing error');
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
