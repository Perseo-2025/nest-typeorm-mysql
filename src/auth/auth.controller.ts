import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { Role } from '../common/enum/rol.enum';
import { Auth } from './decorator/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { IUserActive } from 'src/common/interfaces/user-active.interface';



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
  async profile(@ActiveUser() user: IUserActive){
    const respuesta = await this.authService.profile(user);
    return respuesta;
  }
  
/* async profile(@Req() req : RequestProps){
    const respuesta = await this.authService.profile(req.user);
    return respuesta;
  } */

}
