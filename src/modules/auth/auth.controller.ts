import { Controller, Body,Delete, Get,Param,Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
 
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
    @Get('/list')
    list(){
      return this.authService.list();
    }
    
}
