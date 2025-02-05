import 'dotenv/config';
import * as joi from 'joi';
// TODO: validar mediante un esquema
interface EnvVars {
    DB_PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
}

const envsSchema = joi.object({
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().allow('').optional(),
})
.unknown(true);

const {error, value} = envsSchema.validate({...process.env});


if(error){
    throw new Error (`Config validation error: ${error.message}`)
};

const envVars: EnvVars = value;

// esquema de validacion
export const envs = {
    dbPort: envVars.DB_PORT,
    dbHost: envVars.DB_HOST,
    dbName: envVars.DB_NAME,
    dbUser: envVars.DB_USER,
    dbPassword: envVars.DB_PASSWORD,
}