import express, { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  protectedRouteController,
  refreshTokenController,
  logoutUserController,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { localStrategyMiddleware } from '../middlewares/localStrategyMiddleware';

const userRouter: Router = express.Router();

userRouter.post('/register', registerUserController);

userRouter.post('/login', localStrategyMiddleware, loginUserController);

userRouter.get('/refreshtoken', refreshTokenController);

userRouter.post('/logout', logoutUserController);

userRouter.get('/protected', authMiddleware, protectedRouteController);

/**
 * @openapi
 * /auth/register:
 *  post:
 *     tags:
 *     - Register
 *     description: Registers a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                name:
 *                 type: string
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User has been successfully registered
 *       409:
 *         description: The provided email has already been registered
 */

/**
 * @openapi
 * /auth/login:
 *  post:
 *     tags:
 *     - Login
 *     description: Logins a user with the provided credentials
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User has been successfully logged in
 *       401:
 *         description: User is unauthenticated
 */

/**
 * @openapi
 * /auth/refreshtoken:
 *  post:
 *     tags:
 *     - Refresh Token
 *     description: Generates a new access token with the provided refresh token
 *     parameters:
 *         - in: cookie
 *           name: jwt
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: New access token has been successfully generated
 *       401:
 *         description: User is unauthorized
 */

/**
 * @openapi
 * /auth/logout:
 *  get:
 *     tags:
 *     - Logout
 *     description: Logouts the currently signed-in user
 *     parameters:
 *         - in: cookie
 *           name: jwt
 *           schema:
 *             type: string
 *     responses:
 *       203:
 *         description: User has been successfully logged out
 *       200:
 *         description: User is unauthorized
 */

/**
 * @openapi
 * /auth/protected:
 *  get:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Protected Route
 *     description: A dummy private route that requires authorization to access
 *     responses:
 *       200:
 *         description: User has been successfully authorized
 *       401:
 *         description: User is unauthorized to accesss this route
 */

export default userRouter;
