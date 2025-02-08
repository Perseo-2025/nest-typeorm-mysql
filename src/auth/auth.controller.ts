import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';


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

  @Get( 'profile') 
  @UseGuards(AuthGuard) //<-middleware
  async profile(@Request() req ){
    return req.user;
  }
}
