import { Controller, Body,Delete, Get,Param,Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { CryptoService } from 'src/common/crypto/crypto.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get('/list')
    list(){
      return this.authService.list();
    }
    
}
