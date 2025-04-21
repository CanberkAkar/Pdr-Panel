import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

@UseGuards(AuthGuard('jwt')) // <--- burada koruma geldi
  @Get('/list')
  list(@Request() req) {
    console.log('Giriş yapan kullanıcı:', req);
    return this.authService.list();
  }
}
