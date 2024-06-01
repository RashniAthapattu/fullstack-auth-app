export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string;
  loading: boolean;
};

export type SignInPayload = {
  accessToken: string;
};
