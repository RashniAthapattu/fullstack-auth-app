import { ReactNode } from 'react';
interface PropType {
  children: ReactNode;
}

const AuthWrapper = ({ children }: PropType) => {
  return (
    <>
      <>{children}</>
    </>
  );
};

export default AuthWrapper;
