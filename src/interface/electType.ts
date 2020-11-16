export interface ElectType{
  nickName: string  // 发起人
  title: string  // 选举内容
  option: string  // 选项
}
export type AudienceElectType = {
  id: string
  option: string
}
export type GetResType = {
  id: string
}