import { Injectable,Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';
import { UserToken } from '../auth/entities/token.entity';
import { CryptoService } from '../../common/crypto/crypto.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { UpdateAppointmentDto } from './dto/update-appointment-dto';
@Injectable()
export class AppointmentsService {
    private readonly logger = new Logger(AppointmentsService.name);

    constructor(
        @InjectRepository(Appointments) private readonly appointmentRepository: Repository<Appointments>,
        @InjectRepository(UserToken)
          private readonly cyrptoService: CryptoService,
      ) {}
      async list() {
        await this.logger.log('Attempting to list all users');
        const appointments = await this.appointmentRepository.find();
       // return this.cyrptoService.encrypt({ status: "200", appointments: appointments });
        return { status: "200", appointments: appointments };
       }
      async insert(createAppointmentDto: CreateAppointmentDto) {
        this.logger.log('Attempting to create a new user');
        try {
          const appointment = this.appointmentRepository.create(createAppointmentDto);
          appointment.psychologistId = createAppointmentDto.psychologistId;
          appointment.patientName = createAppointmentDto.patientName;
          appointment.patientId = createAppointmentDto.patientId;
          appointment.duration = createAppointmentDto.duration;
          appointment.status = createAppointmentDto.status;
          appointment.notes = createAppointmentDto.notes;
          await this.appointmentRepository.save(appointment);
    
          this.logger.log(`Appointment created successfully with ID: ${appointment.id}`);
          return this.cyrptoService.encrypt({ status: '201', appointment: appointment });
        } catch (error) {
          return this.cyrptoService.encrypt({
            status: '400',
            message: 'User not created',
          });
        }
      }
      async update(updateAppointmentDto:UpdateAppointmentDto){}
}
