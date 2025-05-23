import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { UpdateAppointmentDto } from './dto/update-appointment-dto';
describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let mockAppointmentService: Partial<AppointmentsService>;
 
  beforeEach(async () => {
    mockAppointmentService = {
      list: jest.fn().mockReturnValue('Appointment list'),
      insert: jest.fn().mockReturnValue('Appointment insert'),
      update: jest.fn().mockReturnValue('Appointment update'),
      delete: jest.fn().mockReturnValue('Appointment delete')

     };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: mockAppointmentService,
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return appointment list', () => {
    const result = controller.list({});
    expect(result).toBe('Appointment list');
  });
  it('should return appointment insert', ()=>{
    const result = controller.insert({} as CreateAppointmentDto);
    expect(result).toBe('Appointment insert');
  });
  it('should return appointment update', ()=>{
    const result = controller.update(1, {} as UpdateAppointmentDto);
    expect(result).toBe('Appointment update');
  });
  it('should return appointment delete', ()=>{
    const result = controller.delete(1);
    expect(result).toBe('Appointment delete');
  });

});
