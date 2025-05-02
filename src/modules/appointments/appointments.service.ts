import { Injectable,Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';
import { UserToken } from '../auth/entities/token.entity';
import { CryptoService } from '../../common/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name);

    constructor(
        @InjectRepository(Appointments) private readonly appointmentRepository: Repository<Appointments>,
        @InjectRepository(UserToken)
        private readonly tokenRepository: Repository<UserToken>,
        private readonly jwtService: JwtService,
        private readonly cyrptoService: CryptoService,
      ) {}
      async list() {
        await this.logger.log('Attempting to list all users');
        const appointments = await this.appointmentRepository.find();
       // return this.cyrptoService.encrypt({ status: "200", appointments: appointments });
        return { status: "200", appointments: appointments };
       }
}
