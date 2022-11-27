import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const dataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "auth",
  username: "zain",
  password: "4875c246f0750ef79606072b7c9f5bb2",
  entities: [],
  synchronize: false,
  logging: true,
});
