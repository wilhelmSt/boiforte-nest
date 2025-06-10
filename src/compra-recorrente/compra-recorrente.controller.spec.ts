import { Test, TestingModule } from '@nestjs/testing';
import { CompraRecorrenteController } from './compra-recorrente.controller';

describe('CompraRecorrenteController', () => {
  let controller: CompraRecorrenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompraRecorrenteController],
    }).compile();

    controller = module.get<CompraRecorrenteController>(CompraRecorrenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
