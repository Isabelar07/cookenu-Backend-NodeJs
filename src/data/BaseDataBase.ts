import knex from "knex";
import Knex from "knex";
import dotenv, { config } from "dotenv";

dotenv.config();
 

export abstract class BaseDataBase {

    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
           host: process.env.DB_HOST,
           port: 3306,
           user: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_NAME,
        },
     });
}