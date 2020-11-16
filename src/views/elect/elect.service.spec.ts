import { Test, TestingModule } from '@nestjs/testing';
import { ElectService } from './elect.service';

describe('ElectService', () => {
  let service: ElectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectService],
    }).compile();

    service = module.get<ElectService>(ElectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
