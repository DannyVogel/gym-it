import {
  CreateRoutineRequest,
  CreateRoutineExercise,
  RoutineExercise,
} from "@/types/db";
/**
 * Fetches all workout routines for a user.
 * @returns {Promise<Array>} A list of routine objects.
 */
export async function getRoutines(): Promise<Array<unknown>> {
  const response = await fetch("/api/routines");
  if (!response.ok) {
    throw new Error("Failed to fetch routines");
  }
  return response.json();
}

/**
 * Creates a new workout routine along with its exercises.
 * @param {string} userId - The ID of the user creating the routine.
 * @param {string} routineName - The name of the routine.
 * @param {CreateRoutineExercise[]} exercises - An array of exercise details for the routine.
 * @returns {Promise<CreateRoutineResponse>} The created routine ID and its exercises.
 */
export async function createRoutine(
  userId: string,
  routineName: string,
  exercises: CreateRoutineExercise[]
): Promise<{ routine_id: string; exercises: RoutineExercise[] }> {
  const requestBody: CreateRoutineRequest = {
    user_id: userId,
    routine_name: routineName,
    exercises: exercises,
  };

  const response = await fetch("/api/routines", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create routine");
  }

  return response.json();
}

/**
 * Adds an exercise to a specific routine.
 * @param {string} routineId - The ID of the routine.
 * @param {string} exerciseApiId - The ID of the exercise from the API.
 * @param {number} order - The order of the exercise.
 * @returns {Promise<Object>} The added exercise object.
 */
export async function addExerciseToRoutine(
  routineId: string,
  exerciseApiId: string,
  order: number
): Promise<object> {
  const response = await fetch(`/api/routines/${routineId}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exerciseApiId, order }),
  });
  if (!response.ok) {
    throw new Error("Failed to add exercise");
  }
  return response.json();
}
