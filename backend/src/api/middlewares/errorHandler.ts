import { AppError } from '../../utils/errorHandler';

const handleKnownExceptions = (err: any, res: any) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
};

const handleUnknownExceptions = (err: any, res: any) => {
  res.status(500).json({ message: 'Something went wrong.' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: any, _req: any, res: any, next: any) => {
  if (err instanceof AppError) {
    handleKnownExceptions(err, res);
  } else {
    handleUnknownExceptions(err, res);
  }
};
