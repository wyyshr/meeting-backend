import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { GetInMeetingUserType, UserType } from 'src/interface/userType';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async login(body: UserType){
    const user = await this.userRepository.findOne({nickName: body.nickName})
    if(!user.nickName) await this.userRepository.save({...body, isInMeeting: true})   // 首次使用
    await this.userRepository.update(user, {...body, isInMeeting: true})
    return {code: 1, success: true, identity: user.identity}
  }

  async getInMeetingUser(query: GetInMeetingUserType){
    const users = await this.userRepository.find({isInMeeting: true})
    const others = users.filter(v => v.nickName != query.nickName)
    const audience = []
      for (let i = 0; i < others.length; i+=9) {
        audience.push(others.slice(i, i+9))
      }
      return {code: 1, data: audience}
  }
}
