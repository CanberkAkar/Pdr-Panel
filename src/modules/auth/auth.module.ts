import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entites/auth.entity';
import { CryptoModule } from './../../common/crypto/crypto.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.strategy'; // bunu birazdan oluşturacağız
import { UserToken } from './entites/token.entity'; // token entity'yi içe aktar
@Module({
  imports: [
    TypeOrmModule.forFeature([Users,UserToken]),
    CryptoModule,
    PassportModule,
    JwtModule.register({
      secret: 'test',  
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}