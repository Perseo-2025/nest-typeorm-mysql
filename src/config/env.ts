import 'dotenv/config';
import * as joi from 'joi';
// TODO: validar mediante un esquema
interface EnvVars {
    PORT:string;
    DB_PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    POSTGRES_SSL: string;
    SECRET_KEY: string;
}

const envsSchema = joi.object({
    PORT: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().allow('').optional(),
    POSTGRES_SSL: joi.string().allow('').optional(),
    SECRET_KEY: joi.string().required()
})
.unknown(true);

const {error, value} = envsSchema.validate({...process.env});


if(error){
    throw new Error (`Config validation error: ${error.message}`)
};

const envVars: EnvVars = value;

// esquema de validacion
export const envs = {
    port: envVars.PORT,
    dbPort: envVars.DB_PORT,
    dbHost: envVars.DB_HOST,
    dbName: envVars.DB_NAME,
    dbUser: envVars.DB_USER,
    dbPassword: envVars.DB_PASSWORD,
    postgresSsl: envVars.POSTGRES_SSL,
    secretKey: envVars.SECRET_KEY
}