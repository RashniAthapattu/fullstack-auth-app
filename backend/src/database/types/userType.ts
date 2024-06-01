/**
 * User Model type
 * @typedef {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {[string]} refreshToken
 *
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  refreshTokens: string[] | null;
}

export interface AuthUserInputs {
  name?: string;
  email: string;
  password: string;
}
