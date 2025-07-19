import { Test, TestingModule } from '@nestjs/testing';
import { CorteProdutoService } from './corte-produto.service';

describe('CorteProdutoService', () => {
  let service: CorteProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorteProdutoService],
    }).compile();

    service = module.get<CorteProdutoService>(CorteProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
