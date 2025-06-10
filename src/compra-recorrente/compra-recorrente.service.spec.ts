import { Test, TestingModule } from '@nestjs/testing';
import { CompraRecorrenteService } from './compra-recorrente.service';

describe('CompraRecorrenteService', () => {
  let service: CompraRecorrenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompraRecorrenteService],
    }).compile();

    service = module.get<CompraRecorrenteService>(CompraRecorrenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
