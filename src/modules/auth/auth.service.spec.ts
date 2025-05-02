import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Users } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CryptoService } from '../../common/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './entities/token.entity';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: Repository<Users>;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const mockAuthRepository = {
      find: jest.fn().mockResolvedValue([]),
      save: jest.fn().mockResolvedValue({}),
      findOne: jest.fn().mockResolvedValue({}),
      softDelete: jest.fn().mockResolvedValue({}),
    };

    const mockTokenRepository = {
      create: jest.fn().mockReturnValue({}),
      save: jest.fn().mockResolvedValue({}),
      findOne: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    };

    const mockCryptoService = {
      encrypt: jest.fn().mockReturnValue('encrypted-value'),
      decrypt: jest.fn().mockReturnValue('decrypted-value'),
      hashPassword: jest.fn().mockReturnValue('hashed-password'),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockAuthRepository,
        },
        {
          provide: getRepositoryToken(UserToken),
          useValue: mockTokenRepository,
        },
        {
          provide: CryptoService,
          useValue: mockCryptoService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    const result = await service.list();
    expect(result).toEqual("encrypted-value");  
    expect(authRepository.find).toHaveBeenCalled();  
    expect(cryptoService.encrypt).toHaveBeenCalledWith({ status: '200', user: [] });
  });
});
