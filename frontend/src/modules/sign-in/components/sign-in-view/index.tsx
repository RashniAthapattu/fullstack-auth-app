import { Loader } from 'modules/common/components';
import SignInFormView from 'modules/sign-in/components/sign-in-form';

import useSignIn from 'modules/sign-in/context/useSignIn';

const SignInView = () => {
  const { loading } = useSignIn();

  return (
    <Loader loading={loading}>
      <SignInFormView />
    </Loader>
  );
};

export default SignInView;
