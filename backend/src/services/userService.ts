import {
  findUser,
  createUser,
  findUserById,
  saveRefreshToken,
  removeRefreshToken,
  removeAllRefreshTokens,
} from '../database/repository/userRepository';
import { IUser } from '../database/types/userType';
import {
  decodeJwt,
  generatePassword,
  generateRefreshToken,
  generateToken,
  validatePassword,
} from '../utils';
import { AppError } from '../utils/errorHandler';

//Custom types for service inputs
export interface RegisterInputs {
  name: string;
  email: string;
  password: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

/**
 * Service function called to register a new user
 * @param {RegisterInputs} userInputs
 * @returns {Promise<{accessToken :string, refreshToken: string}>}
 */
export const registerUserService = async (
  userInputs: RegisterInputs
): Promise<{ accessToken: string; refreshToken: string }> => {
  const { name, email, password } = userInputs;

  const checkExistingUser: IUser = await findUser(email);

  if (checkExistingUser) {
    throw new AppError(409, 'Email Already Registered');
  }

  try {
    let hashedPassword = await generatePassword(password);

    const newUser: IUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = await generateToken({
      email: newUser.email,
      id: newUser.id,
    });

    const refreshToken = await generateRefreshToken({
      email: newUser.email,
      id: newUser.id,
    });

    await saveRefreshToken(newUser.id, refreshToken);

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
/**
 * Service function called to Authencticate a user (Login)
 * @param {LoginInputs} userInputs
 * @returns {Promise<{accessToken :string, refreshToken: string}>}
 */
export const loginUserService = async (
  userInputs: LoginInputs
): Promise<{ accessToken: string; refreshToken: string }> => {
  const { email, password } = userInputs;

  const existingUser: IUser | null = await findUser(email);

  if (existingUser) {
    const validatedPassword = await validatePassword(
      password,
      existingUser.password
    );

    if (validatedPassword) {
      const accessToken = await generateToken({
        email: existingUser.email,
        id: existingUser.id,
      });
      const refreshToken = await generateRefreshToken({
        email: existingUser.email,
        id: existingUser.id,
      });

      await saveRefreshToken(existingUser.id, refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new AppError(401, 'Incorrect Password');
    }
  } else {
    throw new AppError(401, 'User not found');
  }
};

/**
 * Service function called to logout a user
 * @param refreshToken
 */
export const logoutUserService = async (refreshToken: string) => {
  try {
    const user: any = decodeJwt(refreshToken);
    await removeRefreshToken(refreshToken, user.id);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Service function called to idenfity a user by user id
 * @param userID
 * @returns
 */
export const userFindByIDService = async (userID: IUser['id']) => {
  try {
    const user = await findUserById(userID);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const handleTokenReuseDetected = async (email: string) => {
  await removeAllRefreshTokens(email);
};
