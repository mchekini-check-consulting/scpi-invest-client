export interface DistributionRate {
  [year: string]: number;
}

export interface ReconstitutionValue {
  [year: string]: number;
}

export interface Prices {
  [year: string]: number;
}

export interface Localizations {
  [country: string]: number;
}

export interface Sectors {
  [sector: string]: number;
}

export interface ScpiDetailModel {
  id: number;
  name: string;
  minimumSubscription: number;
  capitalization: number;
  manager: string;
  subscriptionFees: number;
  advertising: string;
  managementFees: number;
  delayBenefit: number;
  rentFrequency: string;
  distributionRate: DistributionRate;
  reconstitutionValue: ReconstitutionValue;
  prices: Prices;
  localizations: Localizations;
  sectors: Sectors;
}
