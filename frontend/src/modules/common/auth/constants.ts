/**
 * Auth related API calls
 */
const API = {
  POST_SIGN_OUT: {
    path: '/auth/logout',
    method: 'POST',
  },
  POST_REFRESH_TOKENS: {
    path: '/auth/refreshtoken',
    method: 'GET',
  },
};

export default API;
