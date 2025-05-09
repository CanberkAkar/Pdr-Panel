import { Injectable,Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../../common/crypto/crypto.service';
import { Schedules } from './entities/schedules.entity';

@Injectable()
export class SchedulesService {
    private readonly logger = new Logger(SchedulesService.name);
    constructor(
        @InjectRepository(Schedules)
        private readonly schedulesRepository: Repository<Schedules>,
      
        private readonly cyrptoService: CryptoService
      ) {}
      async list() {
        await this.logger.log('Attempting to list all users');
        const schedules = await this.schedulesRepository.find();
        // return this.cyrptoService.encrypt({ status: "200", appointments: appointments });
        return this.cyrptoService.encrypt({
          status: '200',
          description: 'Appointment listed',
          schedules: schedules,
        });
      }
}
