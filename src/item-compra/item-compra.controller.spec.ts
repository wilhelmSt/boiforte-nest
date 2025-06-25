import { Test, TestingModule } from '@nestjs/testing';
import { ItemCompraController } from './item-compra.controller';

describe('ItemCompraController', () => {
  let controller: ItemCompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCompraController],
    }).compile();

    controller = module.get<ItemCompraController>(ItemCompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
