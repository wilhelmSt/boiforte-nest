import { Test, TestingModule } from '@nestjs/testing';
import { FornecedorController } from './fornecedor.controller';

describe('FornecedorController', () => {
  let controller: FornecedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FornecedorController],
    }).compile();

    controller = module.get<FornecedorController>(FornecedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
