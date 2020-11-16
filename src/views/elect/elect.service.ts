import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Elect } from 'src/entity/elect.entity';
import { ElectType, AudienceElectType, GetResType } from 'src/interface/electType';
import { Repository } from 'typeorm';

@Injectable()
export class ElectService {

  constructor(
    @InjectRepository(Elect)
    private readonly electRepository: Repository<Elect>
  ){}

  // 创建选举   多选项
  async createElect(query: ElectType) {
    await this.electRepository.save({
      nickName: query.nickName,
      title: query.title,
      option: query.option,
      electNums: '',
      isEnd: false
    })
    return {code: 1,success: true}
  }
  // 获取选举内容
  async getElect(){
    const data = await this.electRepository.find({isEnd: false})
    return {code: 1, success: true, data};
  }
  // 观众选举
  async elect(query: AudienceElectType){
    const id = parseInt(query.id)
    const electContent = await this.electRepository.findOne({id, isEnd: false});
    if(!electContent.id) return {code: 0, success: false}
    const options = electContent.option.split(',');  // 选项
    const electRes = []
    let selectIndex = 0
    options.forEach((v,i) => {
      electRes.push(0)
      if(v == query.option) {
        selectIndex = i
      }
    });
    const electNums = (electContent.electNums || electRes.join(',')).split(',');  // 票数
    electNums[selectIndex] = (parseInt(electNums[selectIndex]) + 1).toString();
    await this.electRepository.update(electContent,{
      electNums: electNums.join(',')
    })
    return {code: 1, success: true}
  }
  // 结束选举
  async endElect(query: GetResType){
    const id = parseInt(query.id)
    await this.electRepository.update({id, isEnd: false}, {isEnd: true})
    return {code: 1, success: true}
  }
  // 获取选举结果
  async getElectResult(query: GetResType){
    const id = parseInt(query.id)
    const elect = await this.electRepository.findOne({id})
    if(!elect.isEnd) return {code: 0, success: false}   // 选举还未结束
    const options = elect.option.split(',')
    const result = elect.electNums.split(',')
    const data = []
    options.forEach((v, i) => {
      const res = {
        option: v,
        num: result[i]
      }
      data.push(res)
    });
    return {code: 1, success: true, data}
  }
}
