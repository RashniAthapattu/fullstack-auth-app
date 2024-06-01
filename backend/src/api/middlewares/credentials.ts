import config from '../../config/config';
import { Request, Response, NextFunction } from 'express';

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin as string;
  if (config.allowedOrigins?.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
