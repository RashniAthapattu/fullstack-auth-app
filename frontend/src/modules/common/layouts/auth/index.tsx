import { Outlet, useNavigate } from 'react-router-dom';
import AuthWrapper from 'modules/common/wrappers/auth';
import ROUTES from 'modules/common/constants/route';
import { useEffect } from 'react';
import useAuthorization from 'modules/common/auth/hooks/useAuthorization';

import styled from '@emotion/styled';
import GlobalStyle from 'modules/common/style/global';

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const AuthLayout = () => {
  const { isAuthenticated } = useAuthorization();
  //
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Root>
        <GlobalStyle />
        <AuthWrapper>
          <Outlet />
        </AuthWrapper>
      </Root>
    </>
  );
};

export default AuthLayout;
