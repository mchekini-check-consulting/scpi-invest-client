import {ReconstitutionValue} from "./scpi-detail.model";

export enum property_type {
  PLEINE_PROPRIETE,
  NUE_PROPRIETE
}
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
  reconstitutionValue : number;
}
