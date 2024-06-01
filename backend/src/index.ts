import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connection from './database/connection';
import { corsOptions } from './config/corsOptions';
import { credentials } from './api/middlewares/credentials';
import { errorMiddleware } from './api/middlewares/errorHandler';
import config from './config/config';

import swaggerDocs from './utils/swagger';

import userRouter from './api/routes/userRoutes';

const app: Express = express();

//JWT configurations:
import passport from 'passport';
import { initializeLocalStrategy } from './strategies/localStrategy';
import { initializeJwtStrategy } from './strategies/accessJwtStrategy';
import { initializeRefreshJwtStrategy } from './strategies/refreshJwtStrategy';

//initialize passport strategies
initializeLocalStrategy(passport);
initializeJwtStrategy(passport);
initializeRefreshJwtStrategy(passport);

//Database connection:
connection();

//middleware:
app.use(credentials);
app.use(cors(corsOptions));
//app.use(json());
app.use(bodyParser());
app.use(cookieParser());
app.use('/auth', userRouter);

//error handling middleware:
app.use(errorMiddleware);

//server listen:
const server = () =>
  app.listen(config.port, () => {
    console.log(`Server running at ${config.port}`);

    swaggerDocs(app);
  });
const serverInstace = server();

export { app, serverInstace };
