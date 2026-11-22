import type { RoadmapLevelId } from "@/types/roadmap";

export type TeacherRouteStatus = "draft" | "published";

export interface TeacherRoute {
  id: string;
  ownerId: string;
  classId: string;
  levelId: RoadmapLevelId;
  title: string;
  description: string;
  exerciseIds: string[];
  status: TeacherRouteStatus;
  createdAt: string;
  updatedAt: string;
}
