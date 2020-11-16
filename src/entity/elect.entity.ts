import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Elect {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  nickName: string  // 发起人

  @Column() 
  title: string  // 选举内容

  @Column() 
  option: string  // 选项   aaa, bbb , ccc, ddd

  @Column() 
  electNums: string  // 票数   3, 2 ,5, 2

  @Column() 
  isEnd: boolean  // 是否结束
}