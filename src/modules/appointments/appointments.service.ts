import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';
import { CryptoService } from '../../common/crypto/crypto.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { UpdateAppointmentDto } from './dto/update-appointment-dto';
@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentRepository: Repository<Appointments>,

    private readonly cyrptoService: CryptoService, // sadece bu kadar
  ) {}
  async list() {
    await this.logger.log('Attempting to list all users');
    const appointments = await this.appointmentRepository.find();
    // return this.cyrptoService.encrypt({ status: "200", appointments: appointments });
    return this.cyrptoService.encrypt({
      status: '200',
      description: 'Appointment listed',
      appointments: appointments,
    });
  }
  async insert(createAppointmentDto: CreateAppointmentDto) {
    this.logger.log('Attempting to create a new user');
    try {
      const appointment =
        this.appointmentRepository.create(createAppointmentDto);
      appointment.psychologistId = createAppointmentDto.psychologistId;
      appointment.patientName = createAppointmentDto.patientName;
      appointment.patientId = createAppointmentDto.patientId;
      appointment.duration = createAppointmentDto.duration;
      appointment.status = createAppointmentDto.status;
      appointment.notes = createAppointmentDto.notes;
      await this.appointmentRepository.save(appointment);

      this.logger.log(
        `Appointment created successfully with ID: ${appointment.id}`,
      );
      return this.cyrptoService.encrypt({
        status: '201',
        appointment: appointment,
      });
    } catch (error) {
      return this.cyrptoService.encrypt({
        status: '400',
        message: 'Appointment not created',
      });
    }
  }
  async update(updateAppointmentDto: UpdateAppointmentDto) {
    await this.logger.log('Attempting to update a user');
    const appointment = await this.appointmentRepository.findOne({
      where: { id: Number(updateAppointmentDto.id) },
    });

    if (!appointment) {
      return this.cyrptoService.encrypt({
        status: '404',
        message: 'Appointment not found',
      });
    }

    try {
      appointment.psychologistId = updateAppointmentDto.psychologistId;
      appointment.patientName = updateAppointmentDto.patientName;
      appointment.patientId = updateAppointmentDto.patientId;
      appointment.duration = updateAppointmentDto.duration;
      appointment.status = updateAppointmentDto.status;
      appointment.notes = updateAppointmentDto.notes;

      await this.appointmentRepository.save(appointment);

      return this.cyrptoService.encrypt({
        status: '200',
        description: 'Appointment updated',
        appointment: appointment,
      });
    } catch (error) {
      return this.cyrptoService.encrypt({
        status: '400',
        message: 'Appointment not updated',
      });
    }
  }
  async delete(appointmentId: number) {
    await this.logger.log('Attempting to update user');
    const appointment = await this.appointmentRepository.findOne({
      where: { id: Number(appointmentId) },
    });
    try {
      if (appointment) {
        await this.appointmentRepository.softDelete(Number(appointmentId));
        return this.cyrptoService.encrypt({
          status: '200',
          description: 'Appointment deleted',
        });
      }
    } catch (error) {
      return this.cyrptoService.encrypt({
        status: '400',
        message: 'Appointment not deleted',
      });
    }
  }
}
