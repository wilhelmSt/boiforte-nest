import { Test, TestingModule } from '@nestjs/testing';
import { ItemCompraRecorrenteService } from './item-compra-recorrente.service';

describe('ItemCompraRecorrenteService', () => {
  let service: ItemCompraRecorrenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCompraRecorrenteService],
    }).compile();

    service = module.get<ItemCompraRecorrenteService>(ItemCompraRecorrenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
