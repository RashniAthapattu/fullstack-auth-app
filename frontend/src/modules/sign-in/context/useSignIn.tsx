import { useContext } from 'react';
import SignInContext from './SignInProvider';

const useSignIn = () => useContext(SignInContext);

export default useSignIn;
