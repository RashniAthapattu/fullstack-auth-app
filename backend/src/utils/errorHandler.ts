/**
 * Class to create an App Error
 */
export class AppError extends Error {
  statusCode: number;

  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
