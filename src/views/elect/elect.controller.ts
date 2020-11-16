import { Controller, Get, Query } from '@nestjs/common';
import { ElectService } from './elect.service';

@Controller('elect')
export class ElectController {
  constructor(
    private readonly electService: ElectService
  ){}

  // 创建选举
  @Get('/new')
  createElect(@Query() query){
    return this.electService.createElect(query)
  }

  // 获取选举内容
  @Get('/getElect')
  getElect(){
    return this.electService.getElect()
  }

  // 观众投票
  @Get('/')
  elect(@Query() query){
    return this.electService.elect(query)
  }

  // 结束选举
  @Get('/endElect')
  endElect(@Query() query){
    return this.electService.endElect(query)
  }

  // 获取观众投票结果
  @Get('/getElectResult')
  getElectResult(@Query() query){
    return this.electService.getElectResult(query)
  }
}
