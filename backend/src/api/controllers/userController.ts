// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Request, Response, NextFunction } from 'express';
import {
  registerUserService,
  userFindByIDService,
  logoutUserService,
  handleTokenReuseDetected,
} from '../../services/userService';
import jwt from 'jsonwebtoken';
import { decodeJwt, generateRefreshToken, generateToken } from '../../utils';
import config from '../../config/config';
import {
  doesRefreshTokenExist,
  findUserByEmail,
  removeRefreshToken,
  saveRefreshToken,
} from '../../database/repository/userRepository';

import { User } from 'src/database/models/userModel';

//Custom interface of Request used in Passport-local
export interface CustomRequest extends Request {
  user: {
    accessToken: string;
    refreshToken: string;
  };
}

/**
 * Register user handler function
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const { accessToken, refreshToken } = await registerUserService({
      name,
      email,
      password,
    });
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      accessToken,
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * Login user handler function
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = (req as CustomRequest)?.user;
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      accessToken,
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * Refresh token handler function
 * @param req
 * @param res
 * @param next
 */

export const refreshTokenController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // if cookie not found send unauthorized response
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    //remove jwt from cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    const user: any = decodeJwt(refreshToken);
    if (!user) return res.sendStatus(403);
    const foundUser: User = await findUserByEmail(user.email);

    const tokenExist = await doesRefreshTokenExist(foundUser, refreshToken);
    // const foundUser = await findUserByEmail(user.email);
    // const tokenIndex = foundUser?.refreshTokens?.findIndex(
    //   (token: string) => token === refreshToken
    // );

    // Detected refresh token reuse
    if (!tokenExist) {
      jwt.verify(
        refreshToken,
        config.refreshTokenKey as string,
        async (err, decoded) => {
          if (err) return res.sendStatus(403);
          handleTokenReuseDetected(decoded.email);
        }
      );
      return res.sendStatus(403); //Forbidden
    }
    // remove refreshtoken from refreshtokens
    await removeRefreshToken(refreshToken, foundUser?.id);

    jwt.verify(
      refreshToken,
      config.refreshTokenKey as string,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(401);
        if (err || foundUser?.email !== decoded.email)
          return res.sendStatus(403);

        const accessToken = generateToken({
          email: foundUser?.email,
          id: foundUser?.id,
        });

        const newRefreshToken = generateRefreshToken({
          email: foundUser?.email,
          id: foundUser?.id,
        });

        // Saving refreshToken with current user
        await saveRefreshToken(foundUser?.id, newRefreshToken);

        res.cookie('jwt', newRefreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({ accessToken });
      }
    );
  } catch (error: any) {
    next(error);
  }
};

/**
 * Logout Handler function
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    await logoutUserService(refreshToken);
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    return res.sendStatus(204);
  } catch (error: any) {
    next(error);
  }
};

/**
 * private resource handler function
 * @param req
 * @param res
 * @param next
 */
export const protectedRouteController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await userFindByIDService(req.user);
    res.status(200).send(`Authenticated User ${user.name}`);
  } catch (error: any) {
    next(error);
  }
};
