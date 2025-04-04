import { Injectable ,Logger} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';

import { Users } from './entites/auth.entity';
import { CryptoService } from '../../common/crypto/crypto.service';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Users) private readonly authRepository: Repository<Users>,private readonly cyrptoService:CryptoService) {}
    private readonly logger = new Logger(AuthService.name); 

    async list() {
        await this.logger.log('Attempting to list all users');
        const users = await this.authRepository.find();
        return this.cyrptoService.encrypt({ status: "200", user: users });
    }
    async login(loginUserDto: LoginUserDto) {
        await this.logger.log('Attempting to login user');
        const email=loginUserDto.email;
        const password=this.cyrptoService.hashPassword(loginUserDto.password);
        const user = await this.authRepository.findOne({ where: { email: email, password: password } });
        if (!user) {
            return this.cyrptoService.encrypt({ status: "404", message: "User not found" });
        }
        return this.cyrptoService.encrypt({ status: "200", user: user });
    }
}
