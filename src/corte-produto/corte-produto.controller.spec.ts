import { Test, TestingModule } from '@nestjs/testing';
import { CorteProdutoController } from './corte-produto.controller';

describe('CorteProdutoController', () => {
  let controller: CorteProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorteProdutoController],
    }).compile();

    controller = module.get<CorteProdutoController>(CorteProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
