import { Test, TestingModule } from '@nestjs/testing';
import { TipoProdutoController } from './tipo-produto.controller';

describe('TipoProdutoController', () => {
  let controller: TipoProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoProdutoController],
    }).compile();

    controller = module.get<TipoProdutoController>(TipoProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
