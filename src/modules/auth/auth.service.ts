import { Injectable ,Logger} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entites/auth.entity';
@Injectable()
export class AuthService {

    constructor(@InjectRepository(Users) private readonly authRepository: Repository<Users>) {}
    private readonly logger = new Logger(AuthService.name); 

    async list() {
        await this.logger.log('Attempting to list all users');
        const users = await this.authRepository.find();
        return { status: "200", user: users };
    }
}
