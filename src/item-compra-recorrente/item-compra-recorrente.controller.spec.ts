import { Test, TestingModule } from '@nestjs/testing';
import { ItemCompraRecorrenteController } from './item-compra-recorrente.controller';

describe('ItemCompraRecorrenteController', () => {
  let controller: ItemCompraRecorrenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemCompraRecorrenteController],
    }).compile();

    controller = module.get<ItemCompraRecorrenteController>(ItemCompraRecorrenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
