import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });
console.log( process.env.DB_TYPE);
console.log( __dirname); 


  console.log("POSTGRES_HOST", process.env.VAS_DB_HOST);
  console.log("VAS_DB_USER", process.env.VAS_DB_USER);
  console.log("POSTGRES_PASSWORD", process.env.VAS_DB_PASSWORD);
  console.log("POSTGRES_USER", process.env.VAS_DATABASE);
  console.log("VAS_DB_PORT", process.env.VAS_DB_PORT);
 
  
  console.log( process.env.TYPE_ORM_SYNC === 'ON');


  const config= {
    type:process.env.VAS_DB_TYPE|| 'postgres', 
    host: process.env.VAS_DB_HOST || 'postgres',
    username: process.env.VAS_DB_USER||'myuser',
    password: process.env.VAS_DB_PASSWORD||'mypass',
    port: parseInt(process.env.VAS_DB_PORT)|| 5432,
    database:process.env.VAS_DATABASE || 'vas',

    synchronize: process.env.VAS_TYPE_ORM_SYNC === 'ON', //process.env.NODE_ENV === 'development',
   
    logger: 'advanced-console',
    migrationsTableName: 'migrations_typeorm', 
    migrationsRun: false,
     entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/**/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    logging: false, 
  
  };
console.log(config);

export default registerAs('database', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
 

