export interface UserScpiModel {
  scpiId: number;
  scpiName : String;
  image: string;
  investmentStatus : String;
  requestDate: Date;
  investmentValidationDate: Date;
  totalAmount : Number;
  totalReconstitutionValue: Number;
  distributionRate: string;
}
