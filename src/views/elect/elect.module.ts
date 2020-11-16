import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectController } from './elect.controller';
import { ElectService } from './elect.service';
import { Elect } from 'src/entity/elect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Elect])],
  controllers: [ElectController],
  providers: [ElectService]
})
export class ElectModule {}
