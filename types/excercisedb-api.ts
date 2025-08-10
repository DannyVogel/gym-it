export interface Exercise {
  exerciseId: string;
  name: string;
  gifUrl: string;
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
  instructions: string[];
}

export interface SearchMetadata {
  totalExercises: number;
  totalPages: number;
  currentPage: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface ExerciseSearchResponse {
  success: true;
  metadata: SearchMetadata;
  data: Exercise[];
}

export interface ExerciseByIdResponse {
  success: boolean;
  data: Exercise;
}

export interface SearchOptions {
  q: string;
  offset?: number;
  limit?: number;
  threshold?: number;
}
