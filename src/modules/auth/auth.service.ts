import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Users } from './entities/auth.entity';
import { UserToken } from './entities/token.entity';
import { CryptoService } from '../../common/crypto/crypto.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Users) private readonly authRepository: Repository<Users>,
    @InjectRepository(UserToken)
    private readonly tokenRepository: Repository<UserToken>,
    private readonly jwtService: JwtService,
    private readonly cyrptoService: CryptoService,
  ) {}

  async list() {
    await this.logger.log('Attempting to list all users');
    const users = await this.authRepository.find();
    // return this.cyrptoService.encrypt({ status: "200", user: users });

    return { status: '200', user: users };
  }

  async login(loginUserDto: LoginUserDto) {
    await this.logger.log('Attempting to login user');

    const email = loginUserDto.email;
    const password = this.cyrptoService.hashPassword(loginUserDto.password);

    const user = await this.authRepository.findOne({
      where: { email, password },
    });

    if (!user) {
      return this.cyrptoService.encrypt({
        status: '404',
        message: 'User not found',
      });
      // return { status: "404", message: "User not found" };
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

    return this.cyrptoService.encrypt({
      status: '200',
      user: user,
      token: access_token,
    });
    // return {
    //   status: "200",
    //   user: user,
    //   token: access_token,
    // };
  }
  async insert(createUserDto: CreateUserDto) {
    this.logger.log('Attempting to create a new user');

    try {
      const users = this.authRepository.create(createUserDto);
      users.email = createUserDto.email;
      users.name = createUserDto.name;
      users.password = this.cyrptoService.hashPassword(createUserDto.password);
      users.contact = createUserDto.contact;
      users.phoneNumber = createUserDto.phoneNumber;
      users.role = createUserDto.role;
      await this.authRepository.save(users);

      this.logger.log(`User created successfully with ID: ${users.id}`);
      return this.cyrptoService.encrypt({ status: '201', user: users });
    } catch (error) {
      return this.cyrptoService.encrypt({
        status: '400',
        message: 'User not created',
      });
    }
  }
  async update(updateUserDto: UpdateUserDto) {
    await this.logger.log('Attempting to update user');
    const users = await this.authRepository.findOne({
      where: { id: Number(updateUserDto.id) },
    });
    try {
      if (users) {
        users.email = updateUserDto.email;
        users.name = updateUserDto.name;
        users.password = updateUserDto.password;
        users.contact = updateUserDto.contact;
        users.phoneNumber = updateUserDto.phoneNumber;
        users.role = updateUserDto.role;
        await this.authRepository.save(users);
        return this.cyrptoService.encrypt({ status: '200', user: users });
      }
    } catch (error) {
      return this.cyrptoService.encrypt({
        status: '400',
        message: 'User not updated',
      });
    }
  }
  async delete(userId: number) {
    await this.logger.log('Attempting to update user');
    const user = await this.authRepository.findOne({
      where: { id: Number(userId) },
    });
    try {
      if (user) {
        await this.authRepository.softDelete(Number(userId));
        return this.cyrptoService.encrypt( { status: '200', user: user });
      }
    } catch (error) {
      return this.cyrptoService.encrypt({
        status: '400',
        message: 'User not deleted',
      });
    }
  }
  async logout(token: string) {
    try {
      this.logger.log('Attempting to logout user');
      const tokenEntity = await this.tokenRepository.findOne({ where: { token } });
  
      if (tokenEntity) {
        await this.tokenRepository.delete(tokenEntity.id);
        return this.cyrptoService.encrypt({ status: '200', message: 'Logout successful' });
      } else {
        return this.cyrptoService.encrypt({ status: '404', message: 'Token not found' });
      }
    } catch (error) {
      this.logger.error('Logout error', error);
      return this.cyrptoService.encrypt({ status: '500', message: 'Internal server error' });
    }
  }
  
}
