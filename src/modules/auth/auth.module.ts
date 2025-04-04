import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entites/auth.entity';
import { CryptoModule } from './../../common/crypto/crypto.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    CryptoModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
 
})
export class AuthModule {}
