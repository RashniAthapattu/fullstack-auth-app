import { ReactNode } from 'react';

import { AuthProvider } from 'modules/common/auth';

import { NotificationProvider } from 'modules/common/notifications/context/NotificationProvider';
import { SignUpProvider } from 'modules/sign-up/context/SignUpProvider';

import { SignInProvider } from 'modules/sign-in/context/SignInProvider';

interface PropType {
  children: ReactNode;
}

export const NestedProvider = ({ children }: PropType) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <SignUpProvider>
          <SignInProvider>{children}</SignInProvider>
        </SignUpProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
