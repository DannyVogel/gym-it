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

// Interface for the POST request body to create a new routine
export interface CreateRoutineRequest {
  user_id: string;
  routine_name: string;
  exercises: CreateRoutineExercise[];
}

// Interface for the exercises array within the POST request
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
