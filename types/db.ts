export interface WorkoutRoutine {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;
  exercise_api_id: string;
  order: number;
  sets: number | null;
  reps: number | null;
  created_at: string;
}

export interface CreateRoutineRequest {
  routine_name: string;
  exercises: CreateRoutineExercise[];
}

export interface CreateRoutineExercise {
  exercise_api_id: string;
  order: number;
  sets?: number;
  reps?: number;
}

export interface CreateRoutineResponse {
  routine_id: string;
  exercises: RoutineExercise[];
}
