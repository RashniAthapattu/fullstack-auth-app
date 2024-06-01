import config from '../config/config';

// Checks if requests are only from allowed Origins

export const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (config.allowedOrigins?.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
