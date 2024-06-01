import dotenv from 'dotenv';

//check if the environment is production/development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  port: process.env.PORT,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(','),

  accessTokenKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  salt: process.env.SALT,

  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
};
