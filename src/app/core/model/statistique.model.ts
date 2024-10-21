export interface Statistique {
  localizations: Map<string, number>;
  sectors: Map<string, number>;
  partPrices: Map<string, Map<string, number>>;
}
