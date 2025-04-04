import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/config'; 

import { AuthModule } from '././modules/auth/auth.module'; 
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],  
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),  
      }),
    }),
    AuthModule,
   ],
})
export class AppModule {}
