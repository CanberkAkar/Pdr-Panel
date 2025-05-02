import { Module } from '@nestjs/common';
 
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';
import { CryptoModule } from './../../common/crypto/crypto.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../config/auth.strategy';
import { UserToken } from './../auth/entities/token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Appointments, UserToken]),
    CryptoModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRETKEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    AuthModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, JwtStrategy],
})
export class AppointmentsModule {}

