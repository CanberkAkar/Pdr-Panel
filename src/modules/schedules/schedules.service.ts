import { Injectable,Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../../common/crypto/crypto.service';
import { Schedules } from './entities/schedules.entity';
import { CreateScheduleDto } from './dto/create-schedules-dto';
import { UpdateScheduleDto } from './dto/update-schedules-dto';

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
      async insert(createScheduleDto:CreateScheduleDto){
        this.logger.log('Attempting to create a new user');
        try {
          const schedules = this.schedulesRepository.create(createScheduleDto);
          schedules.psychologistId = createScheduleDto.psychologistId;
          schedules.patientName=createScheduleDto.patientName;
          schedules.patientId=createScheduleDto.patientId;
          schedules.day=createScheduleDto.day;
          schedules.startTime=createScheduleDto.startTime;
          schedules.endTime=createScheduleDto.endTime;
          schedules.status=createScheduleDto.status;
          schedules.note=createScheduleDto.note;
          await this.schedulesRepository.save(schedules);
          
          this.logger.log(
            `Appointment created successfully with ID: ${schedules.id}`,
          );
          return this.cyrptoService.encrypt({
            status: '201',
            appointment: schedules,
          });
        } catch (error) {
          return this.cyrptoService.encrypt({
            status: '400',
            message: 'Appointment not created',
          });
        }
      }
      async update(updateSchedulesDto: UpdateScheduleDto) {
        await this.logger.log('Attempting to update a user');
        const schedules = await this.schedulesRepository.findOne({
          where: { id: Number(updateSchedulesDto.id) },
        });
    
        if (!schedules) {
          return this.cyrptoService.encrypt({
            status: '404',
            message: 'Appointment not found',
          });
        }
          try {
          schedules.psychologistId = updateSchedulesDto.psychologistId;
          schedules.patientName=updateSchedulesDto.patientName;
          schedules.patientId=updateSchedulesDto.patientId;
          schedules.day=updateSchedulesDto.day;
          schedules.startTime=updateSchedulesDto.startTime;
          schedules.endTime=updateSchedulesDto.endTime;
          schedules.status=updateSchedulesDto.status;
          schedules.note=updateSchedulesDto.note;
    
          await this.schedulesRepository.save(schedules);
    
          return this.cyrptoService.encrypt({
            status: '200',
            description: 'Appointment updated',
            schedules: schedules,
          });
        } catch (error) {
          return this.cyrptoService.encrypt({
            status: '400',
            message: 'Appointment not updated',
          });
        }
      }
}
