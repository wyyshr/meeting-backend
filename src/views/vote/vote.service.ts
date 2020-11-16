import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from 'src/entity/vote.entity';
import { AudienceVoteType, VoteType } from 'src/interface/voteType';
import { Repository } from 'typeorm';

@Injectable()
export class VoteService {

  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>
  ){}

  // 创建表决   2个选项
  async createVote(query: VoteType) {
    await this.voteRepository.save({
      nickName: query.nickName,
      title: query.title,
      option1: query.option1,
      option2: query.option2,
      voteNum1: 0,
      voteNum2: 0,
      isEnd: false
    })
    return {code: 1, success: true}
  }
  // 获取表决内容
  async getVote(){
    const data = await this.voteRepository.find({isEnd: false})
    return {code: 1, success: true, data};
  }
  // 观众表决
  async vote(query: AudienceVoteType){
    const id = parseInt(query.id)
    const voteContent = await this.voteRepository.findOne({id, isEnd: false});
    if(!voteContent.id) return {code: 0, success: false}
    query.option == voteContent.option1 && await this.voteRepository.update(voteContent,{option1: voteContent.option1+1});
    query.option == voteContent.option2 && await this.voteRepository.update(voteContent,{option2: voteContent.option2+1});
    return {code: 1, success: true}
  }
  // 结束表决
  async endVote(query: {id: string}){
    const id = parseInt(query.id)
    await this.voteRepository.update({id, isEnd: false}, {isEnd: true})
    return {code: 1, success: true}
  }
  // 获取表决结果
  async getVoteResult(query: {id: string}){
    const id = parseInt(query.id)
    const vote = await this.voteRepository.findOne({id})
    if(!vote.isEnd) return {code: 0, success: false}   // 表决还未结束
    const data = [
      { option: vote.option1, num: vote.voteNum1 },
      { option: vote.option2, num: vote.voteNum2 }
    ]
    return {code: 1, success: true, data}
  }
}
