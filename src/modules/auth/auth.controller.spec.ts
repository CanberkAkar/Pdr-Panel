import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      list: jest.fn().mockReturnValue('User list'),
      insert: jest.fn().mockReturnValue('User insert'),
      update: jest.fn().mockReturnValue('User update'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user list', () => {
    const result = controller.list({});
    expect(result).toBe('User list');
  });
  it('should return user insert', ()=>{
    const result = controller.insert({} as CreateUserDto);
    expect(result).toBe('User insert');
  });
  it('should return user update', ()=>{
    //İLGİLİ UPDATE IDSI VE DTO'SU GEREKLİDİR.
    const result = controller.update(1, {} as UpdateUserDto);
    expect(result).toBe('User update');
  });

});
