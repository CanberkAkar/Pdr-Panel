import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Schedules } from './entities/schedules.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forFeature([Schedules, UserToken]),
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
  controllers: [SchedulesController],
  providers: [SchedulesService, JwtStrategy],
})
export class SchedulesModule {}

