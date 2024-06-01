import { NextFunction, Response, Request } from 'express';
import passport from 'passport';

interface CustomRequest extends Request {
  user: {
    email: string;
    id: string;
  };
}
/**
 * authMiddleware for protected routes
 * @param {CustomRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: CustomRequest['user'], _info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
