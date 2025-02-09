import { Body, Controller, Get, Post, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from './enum/rol.enum';
import { Auth } from './decorator/auth.decorator';


interface RequestProps extends Request {
  user: {
    email: string;
    role: string;
  }
}

@Controller('auth')
export class AuthController {
  
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')

  register(@Body() createUserDto :  RegisterDTO){
    return this.authService.register(createUserDto);
  }       


  @Post('login')
  login(@Body() loginDto : LoginDto) {
    return this.authService.login(loginDto);
  }

  /* @Get( 'profile') 
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard) //<-middleware
  async profile(@Req() req : RequestProps){
    const respuesta = await this.authService.profile(req.user);
    return respuesta;
  } */


  @Get( 'profile') 
  @Auth(Role.Admin)
  async profile(@Req() req : RequestProps){
    const respuesta = await this.authService.profile(req.user);
    return respuesta;
  }


}
