import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
require('dotenv').config();

const config: PostgresConnectionOptions = {
    type:'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB,
    ssl: false,
    entities: ['dist/src/**/*.entity{.js,.ts}'],
    synchronize: false, // Only for development :)
    migrations: ['dist/src/db/migrations/*{.js,.ts}'],
    cli: {
        migrationsDir: 'src/db/migrations'
    },
    dropSchema: false
}

export default config