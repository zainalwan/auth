import 'reflect-metadata';
import * as settings from './settings';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

export const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: settings.POSTGRES_HOST,
  port: settings.POSTGRES_PORT,
  database: settings.POSTGRES_DB,
  username: settings.POSTGRES_USER,
  password: settings.POSTGRES_PASSWORD,
  entities: entities,
  migrations: migrations,
  synchronize: false,
  logging: true,
});
