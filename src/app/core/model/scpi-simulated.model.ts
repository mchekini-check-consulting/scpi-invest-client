import {property_type} from "../enum/property-type.enum";
import {Stripping} from "./scpi-invest.model";
import {Localizations, Sectors, StippingMap} from "./scpi-detail.model";
export { property_type } from "../enum/property-type.enum";

export interface Property {
  type: property_type;
  propertyLabel: string;
}

export interface SimulatedScpiModel {
  scpiId : number;
  name: string;
  selectedProperty: Property;
  totalInvest: number;
  partNb: number;
  monthlyIncomes: number;
  withdrawalValue : number;
  strip: Stripping;
  lastYearDistributionRate : string;
  localizations: Localizations;
  sectors: Sectors;
  cashback : number;
  simulated: boolean;
}


export interface userInvestmentInDto {
  scpiId : number;
  name: string;
  selectedProperty: string;
  totalInvest: number;
  partNb: number;
  monthlyIncomes: number;
  withdrawalValue : number;
  discountStripping : StippingMap;
  strip: number;
  lastYearDistributionRate : string;
  localizations: Localizations;
  sectors: Sectors;
  cashback : number;
}
