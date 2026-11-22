export interface AnatomyStepState {
  viewed: boolean;
  challengeSolved: boolean;
}

export interface AnatomyEntry {
  steps: Record<string, AnatomyStepState>;
  completed: boolean;
  updatedAt: string;
}

export type AnatomyByProfile = Record<
  string,
  Record<string, AnatomyEntry>
>;
