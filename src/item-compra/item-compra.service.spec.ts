import { Test, TestingModule } from '@nestjs/testing';
import { ItemCompraService } from './item-compra.service';

describe('ItemCompraService', () => {
  let service: ItemCompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCompraService],
    }).compile();

    service = module.get<ItemCompraService>(ItemCompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
