import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Users } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CryptoService } from '../../common/crypto/crypto.service';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: Repository<Users>;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const mockAuthRepository = {
      find: jest.fn().mockResolvedValue([]), // `find` metodu taklit ediliyor
      save: jest.fn().mockResolvedValue({}),  // `save` metodu taklit ediliyor
      findOne: jest.fn().mockResolvedValue({}), // `findOne` metodu taklit ediliyor
      softDelete: jest.fn().mockResolvedValue({}), // `softDelete` metodu taklit ediliyor
    };

    // Mock CryptoService
    const mockCryptoService = {
      encrypt: jest.fn().mockReturnValue('encrypted-value'), // CryptoService'in encrypt fonksiyonunu mockla
      decrypt: jest.fn().mockReturnValue('decrypted-value'), // CryptoService'in decrypt fonksiyonunu mockla
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockAuthRepository, // Mock repository kullanıyoruz
        },
        {
          provide: CryptoService, // CryptoService mock'u ekliyoruz
          useValue: mockCryptoService,
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
    expect(result).toEqual('encrypted-value');  // Burada yalnızca string bekliyoruz
    expect(authRepository.find).toHaveBeenCalled();  // find metodunun çağrıldığını kontrol et
    expect(cryptoService.encrypt).toHaveBeenCalled();  // CryptoService'in encrypt fonksiyonunun çağrıldığını kontrol et
  });
});
