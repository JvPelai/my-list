import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  synchronize: true,
  logging: ['error', 'query', 'schema'],
  dropSchema: false,
  entities: [__dirname + '/../entities/**/*.ts'],
  migrations: [__dirname + '/../database/migrations/**/*.{t,j}s'],
  subscribers: [__dirname + '/../subscribers/**/*.ts'],
  cli: {
    entitiesDir: __dirname + '/../entities',
    migrationsDir: __dirname + '/../database/migrations',
    subscribersDir: __dirname + '/../subscribers'
  }
} as ConnectionOptions;
