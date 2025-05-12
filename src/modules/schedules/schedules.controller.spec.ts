import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedules-dto';
import { UpdateScheduleDto } from './dto/update-schedules-dto';
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
  it('should return appointment insert', () => {
    const result = controller.insert({} as CreateScheduleDto);
    expect(result).toBe('Appointment insert');
  });
  it('should return appointment update', () => {
    const result = controller.update(1, {} as UpdateScheduleDto);
    expect(result).toBe('Appointment update');
  });
  it('should return appointment delete', ()=>{
    const result = controller.delete(1);
    expect(result).toBe('Appointment delete');
  });
});
