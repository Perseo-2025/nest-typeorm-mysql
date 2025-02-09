import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    )
    {}

    async register(registerDto: RegisterDTO){

        const user = await this.usersService.finOneByEmail(registerDto.email);
        if(user){
            throw new BadRequestException('El usuario ya existe');
        }

        const password = await bcrypt.hash(registerDto.password, 10);
        registerDto.password = password;

        const respuesta = await this.usersService.create(registerDto);
        return respuesta;
    }

    async login(loginDto:LoginDto){
        const user = await this.usersService.finOneByEmail(loginDto.email);
        if(!user){
            throw new UnauthorizedException('El email no existe');
        }
        const {password} = loginDto;
        const isPassword = await bcrypt.compare(password, user.password);
        
        if(!isPassword){
            throw new UnauthorizedException('El password no es correcto');
        }

        const payload = {email : user.email, role: user.role};
        
        const token = await this.jwtService.signAsync(payload);

        const respuesta = {token, user}
        return respuesta;
    }


    async profile({email, role} : {email:string, role:string}){
        console.log(role);
        
        
        /* if(role !== 'admin'){
            throw new UnauthorizedException('No tienes permisos para acceder a este perfil');
        } */
        return await this.usersService.finOneByEmail(email);
    }
}
