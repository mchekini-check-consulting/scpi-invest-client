export interface Statistique {
  repartitionGeographique: Map<string, number>;
  repartitionSectorielle: Map<string, number>;
  evolutionPrixPart: Map<string, Map<string, number>>;
}
