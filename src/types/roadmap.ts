export type RoadmapLevelId = "N0" | "N1" | "N2" | "N3" | "N4" | "N5" | "N6";

export type RoadmapComponentName =
  | "Números y operaciones"
  | "Geometría"
  | "Medidas"
  | "Estadística"
  | "Variación";

export interface RoadmapComponent {
  name: RoadmapComponentName;
  highlights: string[];
}

export interface RoadmapLevel {
  id: RoadmapLevelId;
  order: number;
  title: string;
  baseYear: string;
  focus: string;
  canDo: string;
  checkpoint: string;
  criticalGate: string;
  components: RoadmapComponent[];
  unitIds: string[];
}

export interface CriticalGate {
  id: string;
  label: string;
  levelIds: RoadmapLevelId[];
}
