import {property_type} from "../enum/property-type.enum";
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
  lastYearDistributionRate : string;
}
