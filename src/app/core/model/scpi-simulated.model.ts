import {property_type} from "../enum/property-type.enum";
import {Stripping} from "./scpi-invest.model";
export { property_type } from "../enum/property-type.enum";

export interface Property {
  type: property_type;
  propertyLabel: string;
}

export interface SimulatedScpiModel {
  scpi_id : number;
  name: string;
  selectedProperty: Property;
  totalInvest: number;
  partNb: number;
  monthlyIncomes: number;
  withdrawalValue : number;
  strip: Stripping;
  lastYearDistributionRate : string;
}
