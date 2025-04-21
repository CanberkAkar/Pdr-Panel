import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Users } from './entites/auth.entity';
import { UserToken } from './entites/token.entity';
import { CryptoService } from '../../common/crypto/crypto.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Users) private readonly authRepository: Repository<Users>,
    @InjectRepository(UserToken) private readonly tokenRepository: Repository<UserToken>,
    private readonly jwtService: JwtService,
    private readonly cyrptoService: CryptoService,
  ) {}

  async list() {
    await this.logger.log('Attempting to list all users');
    const users = await this.authRepository.find();
    // return this.cyrptoService.encrypt({ status: "200", user: users });

     return { status: "200", user: users };
  }

  async login(loginUserDto: LoginUserDto) {
    await this.logger.log('Attempting to login user');

    const email = loginUserDto.email;
    const password = this.cyrptoService.hashPassword(loginUserDto.password);

    const user = await this.authRepository.findOne({ where: { email, password } });

    if (!user) {
      // return this.cyrptoService.encrypt({ status: "404", message: "User not found" });
      return { status: "404", message: "User not found" };

    }

     const payload = { sub: user.id, email: user.email };
     const access_token = this.jwtService.sign(payload);

     const tokenEntity = this.tokenRepository.create({
      user_id: user.id,
      token: access_token,
      create_date: new Date(),
      expires_at: new Date(Date.now() + 60 * 60 * 1000),
    });

    await this.tokenRepository.save(tokenEntity);

    //  return this.cyrptoService.encrypt({
    //   status: "200",
    //   user: user,
    //   token: access_token,
    // });
    return {
      status: "200",
      user: user,
      token: access_token,
    };

  }
}
