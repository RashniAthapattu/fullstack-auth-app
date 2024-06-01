import withAuth from 'modules/common/auth/withAuth';

import { useQuery } from '@tanstack/react-query';
import API from 'modules/dashboard/constants';
import request from 'modules/common/utils/request';

const fetchUser = async () => {
  const response = await request(API.GET_USER, null, true);
  return response;
};

const DashboardView = () => {
  const user = useQuery([], fetchUser);
  const loading = user.isLoading;

  if (loading) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    <>
      <h2 style={{ justifyContent: 'center' }}>Dashboard</h2>

      <h2 style={{ justifyContent: 'center' }}>{user.data}</h2>
    </>
  );
};

export default withAuth(DashboardView);
