import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Vote {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  nickName: string  // 发起人

  @Column() 
  title: string  // 表决内容

  @Column() 
  option1: string  // 选项1

  @Column() 
  option2: string  // 选项2

  @Column() 
  voteNum1: number  // 票数1

  @Column() 
  voteNum2: number  // 票数2

  @Column() 
  isEnd: boolean  // 是否结束
}