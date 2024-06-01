import { DataSource } from 'typeorm';
import { User } from './models/userModel';
import config from '../config/config';

import { RefreshToken } from './models/refreshTokenModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: config.dbName,
  username: config.dbUsername,
  password: config.dbPassword,
  host: config.dbHost,
  port: parseInt(config.dbPort as string),
  logging: true,
  synchronize: true,
  entities: [User, RefreshToken],
});

export default async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Postgres Connected');
  } catch (error) {
    console.error(error);
  }
};

export const disconnection = async () => {
  await AppDataSource.destroy();
};
