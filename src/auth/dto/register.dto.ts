import { IsEmail, IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer";

export class RegisterDTO {

    @IsString()
    @MinLength(1)
    dni: string;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    password: string;

}
