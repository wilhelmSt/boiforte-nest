import { Test, TestingModule } from '@nestjs/testing';
import { EspecieProdutoController } from './especie-produto.controller';

describe('EspecieProdutoController', () => {
  let controller: EspecieProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecieProdutoController],
    }).compile();

    controller = module.get<EspecieProdutoController>(EspecieProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
