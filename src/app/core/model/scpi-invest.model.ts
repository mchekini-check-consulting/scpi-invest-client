import {Property} from "./scpi-simulated.model";

export interface Stripping {
  time: number;
  percent : number;
  stipLabel : string;
}

export interface ScpiInvestModel {
  scpiId : number;
  propertyType: String;
  totalInvest: number;
  numberOfShares: number;
  stripping?: number | null;
  partPrice?: number;
}
