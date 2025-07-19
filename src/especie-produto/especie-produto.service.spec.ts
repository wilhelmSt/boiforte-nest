import { Test, TestingModule } from '@nestjs/testing';
import { EspecieProdutoService } from './especie-produto.service';

describe('EspecieProdutoService', () => {
  let service: EspecieProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspecieProdutoService],
    }).compile();

    service = module.get<EspecieProdutoService>(EspecieProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
