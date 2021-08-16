import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  synchronize: true,
  logging: ['error', 'query', 'schema'],
  entities: [__dirname + '/../entities/**/*.{t,j}s'],
  migrations: [__dirname + '/../database/migrations/**/*.{t,j}s'],
  subscribers: [__dirname + '/../subscribers/**/*.{t,j}s'],
  cli: {
    entitiesDir: __dirname + '/../entities',
    migrationsDir: __dirname + '/../database/migrations',
    subscribersDir: __dirname + '/../subscribers'
  }
} as ConnectionOptions;
