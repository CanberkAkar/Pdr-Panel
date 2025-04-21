import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToken } from './entites/token.entity';
import { Users } from './entites/auth.entity';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserToken)
    private readonly tokenRepository: Repository<UserToken>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,  
      passReqToCallback: true, 
    });
  }

  async validate(req: Request, payload: any) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('TOKEN IS MISSING.');
    }

    const userToken = await this.tokenRepository.findOne({ where: { token } });

    if (!userToken || new Date() > userToken.expires_at) {
      throw new UnauthorizedException('API TOKEN EXPIRED.');
    }

    const user = await this.userRepository.findOne({ where: { id: userToken.user_id } });
    if (!user) {
      throw new UnauthorizedException('USER NOT FOUND.');
    }

    return user;
  }
}
