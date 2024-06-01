import { AppDataSource } from '../connection';
import { RefreshToken } from '../models/refreshTokenModel';
import { User } from '../models/userModel';
import { AuthUserInputs, IUser } from '../types/userType';

/**
 *
 * @param param0
 * @returns
 */
export const createUser = async ({
  name,
  email,
  password,
}: AuthUserInputs): Promise<IUser> => {
  const user = await User.save({
    name,
    email,
    password,
  });
  return user as IUser;
};

/**
 *
 * @param email
 * @returns
 */
export const findUser = async (email: IUser['email']): Promise<IUser> => {
  const existingUser = await User.findOneBy({ email });
  return existingUser as any;
};

/**
 *
 * @param refreshToken
 * @param id
 * @returns
 */
//returns user record that matches the refresh token given as an argument
export const findTokenInUser = async (
  refreshToken: string,
  id: IUser['id']
): Promise<boolean> => {
  const user = await User.findOneBy({ id });
  if (user) {
    const tokenIndex = user?.refreshTokens?.findIndex(
      (token: any) => token.token === refreshToken
    );

    if (tokenIndex !== -1) {
      return true;
    }
  }
  return false;
};

/**
 *
 * @param id
 * @param refreshToken
 */
//saves refresh token to the user record of the currently signed-in user
export const saveRefreshToken = async (
  id: IUser['id'],
  refreshToken: string
): Promise<void> => {
  const user = await User.findOneBy({ id });
  await RefreshToken.save({ refreshToken, user });
};

/**
 *
 * @param refreshToken
 * @param id
 */
//clears the refresh token in the user record which matches the refresh token given as an argument
export const removeRefreshToken = async (
  refreshToken: string,
  id: IUser['id']
): Promise<void> => {
  const user = await User.findOneBy({ id });
  if (user) {
    const tokenIndex = user?.refreshTokens?.findIndex(
      (token: any) => token.token === refreshToken
    );

    if (tokenIndex !== -1) {
      await RefreshToken.delete({ refreshToken });
    }

    await user?.save();
  }
};

/**
 *
 * @param id
 * @returns
 */
//returns user record that matches the id given as an argument
export const findUserById = async (id: IUser['id']): Promise<IUser> => {
  const existingUser = await User.findOneBy({ id });
  return existingUser as any;
};

export const findUserByEmail = async (email: IUser['email']): Promise<User> => {
  return await User.findOneBy({ email });
};

export const removeAllRefreshTokens = async (email) => {
  const user = await User.findOneBy({ email });
  await AppDataSource.getRepository(RefreshToken)
    .createQueryBuilder('refreshToken')
    .delete()
    .from(RefreshToken)
    .where('userId = :userId', { userId: user.id })
    .execute();
};

const getRefreshTokensForUser = async (
  userId: string
): Promise<RefreshToken[]> => {
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  const refreshTokens = await refreshTokenRepository
    .createQueryBuilder('refreshToken')
    .leftJoinAndSelect('refreshToken.user', 'user')
    .where('user.id = :userId', { userId })
    .select('refreshToken.refreshToken')
    .getMany();

  return refreshTokens;
};

export const doesRefreshTokenExist = async (
  user: User,
  refreshToken: string
) => {
  const refreshTokens = await getRefreshTokensForUser(user.id);
  return refreshTokens.some((token) => token.refreshToken === refreshToken);
};
