import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  nickName: string  // 用户名

  @Column() 
  identity: number  // 身份 1-管理员 2-观众

  @Column()
  gender: number    // 性别 1-男 2-女

  @Column()
  avatarUrl: string // 头像

  @Column()
  isInMeeting: boolean // 是否进入会议
}