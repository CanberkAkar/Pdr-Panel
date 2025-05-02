import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let mockAppointmentService: Partial<AppointmentsService>;
 
  beforeEach(async () => {
    mockAppointmentService = {
      list: jest.fn().mockReturnValue('User list')
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
    expect(result).toBe('User list');
  });
});
