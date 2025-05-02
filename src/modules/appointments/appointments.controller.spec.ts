import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let mockAppointmentService: Partial<AppointmentsService>;
 
  beforeEach(async () => {
    mockAppointmentService = {
      list: jest.fn().mockReturnValue('Appointment list'),
      insert: jest.fn().mockReturnValue('Appointment insert')
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

});
