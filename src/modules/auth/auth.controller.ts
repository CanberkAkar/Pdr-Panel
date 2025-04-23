import { Controller, Get, Post, Body, Request, UseGuards,Put,Param,Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
      console.log('Giriş yapan kullanıcı:', req);
      return this.authService.list();
    }
    @UseGuards(AuthGuard('jwt')) 
    @Post('/insert')
    insert(@Body() createUserDto: CreateUserDto) {
      return this.authService.insert(createUserDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/update/:id')
    update(
      @Param('id') userId: number,
      @Body() body: UpdateUserDto
    ) {
      body.id = Number(userId); // Doğru kullanım
      return this.authService.update(body);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    deleteUser(@Param('id') userId: number) {
      return this.authService.delete(userId);
    }
  }
 