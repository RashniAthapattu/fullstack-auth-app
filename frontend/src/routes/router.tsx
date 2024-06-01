import { Navigate, RouteObject } from 'react-router-dom';
import ROUTES from 'modules/common/constants/route';

import SignInView from 'modules/sign-in/components/sign-in-view';

import SignUpView from 'modules/sign-up/components/sign-up-view';

import AuthLayout from 'modules/common/layouts/auth';

import DashboardView from 'modules/dashboard/components/dashboard-view';

/**
 * Central routing setup here
 */
const routes: Array<RouteObject> = [
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} />,
  },
  {
    path: ROUTES.ROOT,
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.REGISTER,
        element: <SignUpView />,
      },
      {
        path: ROUTES.LOGIN,
        element: <SignInView />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardView />,
  },
];

export default routes;
