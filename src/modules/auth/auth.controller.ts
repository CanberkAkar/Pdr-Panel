import { Controller, Get, Post, Body, Request, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // Swagger UI'da 'auth' grubu
@ApiBearerAuth('access-token') // Buradaki 'access-token', main.ts'deki key ile aynı olmalı
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  list(@Request() req) {
    return this.authService.list();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/insert')
  insert(@Body() createUserDto: CreateUserDto) {
    return this.authService.insert(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  update(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    body.id = Number(userId);
    return this.authService.update(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  deleteUser(@Param('id') userId: number) {
    return this.authService.delete(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Request() req) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '').trim();
    return this.authService.logout(token);
  }
}
