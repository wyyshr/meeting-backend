import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetInMeetingUserType, UserType } from 'src/interface/userType';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post('/login')
  login(@Body() body: UserType){
    return this.userService.login(body)
  }

  @Get('/getInMeetingUser')
  getInMeetingUser(@Query() query: GetInMeetingUserType){
    return this.userService.getInMeetingUser(query)
  }
}
