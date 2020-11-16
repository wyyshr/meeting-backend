import { Test, TestingModule } from '@nestjs/testing';
import { ElectController } from './elect.controller';

describe('ElectController', () => {
  let controller: ElectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectController],
    }).compile();

    controller = module.get<ElectController>(ElectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
