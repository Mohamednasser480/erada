import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });
console.log( process.env.DB_TYPE);
console.log( __dirname); 


  console.log("POSTGRES_HOST", process.env.POSTGRES_HOST);
  console.log("POSTGRES__DATABASE", process.env.POSTGRES_DATABASE);
  console.log("POSTGRES_PASSWORD", process.env.DB_PASSWORD);
 
  
  console.log( process.env.TYPE_ORM_SYNC === 'ON');


  const config= {
    type: 'postgres', 
    host: process.env.POSTGRES_HOST || 'postgres',
    username: process.env.POSTGRES_USER||'myuser',
    password: process.env.DB_PASSWORD||'mypass',
    port: parseInt(process.env.POSTGRES_PORT),

    database:process.env.POSTGRES_DATABASE || 'identity',
    synchronize: process.env.TYPE_ORM_SYNC === 'ON', //process.env.NODE_ENV === 'development',
   
    logger: 'advanced-console',
    migrationsTableName: 'migration_table',
    migrationsRun: true,
     entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: [ "./src/**/migrations/**/*.{js,ts}"],
    seeds: ["dist/**/*.seed{.ts,.js}"],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      // entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
      migrationsDir: './src/database/migrations',
      // subscribersDir: process.env.TYPEORM_SUBSCRIBERS_DIR,
    },
    autoLoadEntities: true,
    logging: false, 
  
  };

  console.log(config);
  

export const database= registerAs('database', () => config)
export default   new DataSource(config as DataSourceOptions);
 

