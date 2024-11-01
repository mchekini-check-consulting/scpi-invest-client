export interface UserScpiModel {
  scpiId: number;
  scpiName : String;
  image: string;
  investmentStatus : String;
  requestDate: Date;
  detentionDays: number;
  totalAmount : Number;
  currentValue: Number;
  distributionRate: string;
}
