import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../entities/**/*.ts'],
  migrations: [__dirname + '/../migrations/**/*.ts'],
  subscribers: [__dirname + '/../subscribers/**/*.ts'],
  cli: {
    entitiesDir: __dirname + '/../entities',
    migrationsDir: __dirname + '/../migrations',
    subscribersDir: __dirname + '/../subscribers'
  }
} as ConnectionOptions;
