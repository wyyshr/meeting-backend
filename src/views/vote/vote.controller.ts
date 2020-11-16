import { Controller, Get, Query } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {

  constructor(
    private readonly voteService: VoteService
  ){}

  // 创建表决
  @Get('/new')
  createVote(@Query() query){
    return this.voteService.createVote(query)
  }

  // 获取表决内容
  @Get('/getVote')
  getVote(){
    return this.voteService.getVote()
  }

  // 观众表决
  @Get('/')
  vote(@Query() query){
    return this.voteService.vote(query)
  }

  // 结束表决
  @Get('/endVote')
  endVote(@Query() query){
    return this.voteService.endVote(query)
  }

  // 获取观众表决结果
  @Get('/getVoteResult')
  getVoteResult(@Query() query){
    return this.voteService.getVoteResult(query)
  }
}
