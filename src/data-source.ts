import 'reflect-metadata';
import * as settings from './settings';
import { DataSource } from 'typeorm';

export const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: settings.POSTGRES_HOST,
  port: settings.POSTGRES_PORT,
  database: settings.POSTGRES_DB,
  username: settings.POSTGRES_USER,
  password: settings.POSTGRES_PASSWORD,
  entities: [],
  synchronize: false,
  logging: true,
});
