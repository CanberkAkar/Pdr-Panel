import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
describe('SchedulesController', () => {
  let controller: SchedulesController;
  let mockSchedulesService: Partial<SchedulesService>;
  beforeEach(async () => {
    mockSchedulesService = {
      list: jest.fn().mockReturnValue('Appointment list'),
      insert: jest.fn().mockReturnValue('Appointment insert'),
      update: jest.fn().mockReturnValue('Appointment update'),
      delete: jest.fn().mockReturnValue('Appointment delete')

     };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulesService,
          useValue: mockSchedulesService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return appointment list', () => {
    const result = controller.list({});
    expect(result).toBe('Appointment list');
  });
});
