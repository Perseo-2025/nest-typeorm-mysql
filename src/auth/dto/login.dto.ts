import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @MinLength(1)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  password: string;
}
