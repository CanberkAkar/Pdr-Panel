import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/config'; 
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '././modules/auth/auth.module'; 
import { CryptoModule } from './common/crypto/crypto.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],  
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,CryptoModule],
      
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),  
      }),
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
   ],
})
export class AppModule {}
