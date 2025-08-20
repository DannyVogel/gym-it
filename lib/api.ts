import {
  ExerciseByIdResponse,
  ExerciseSearchResponse,
  SearchOptions,
} from "@/types/excercisedb-api";

const API_BASE_URL = "https://exercisedb-api-theta.vercel.app/api/v1";

export async function searchExercises({
  q,
  offset = 0,
  limit = 10,
  threshold = 0.3,
}: SearchOptions): Promise<ExerciseSearchResponse> {
  const params = new URLSearchParams({
    q,
    offset: offset.toString(),
    limit: limit.toString(),
    threshold: threshold.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/exercises/search?${params}`);
  if (!response.ok) throw new Error("Failed to search exercises");
  return response.json();
}

export async function getExerciseById(
  exerciseId: string
): Promise<ExerciseByIdResponse> {
  const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch exercise");
  }
  return response.json();
}

export async function getExercisesByIds(
  exerciseIds: string[]
): Promise<ExerciseByIdResponse[]> {
  const promises = exerciseIds.map(async (id) => {
    try {
      return await getExerciseById(id);
    } catch (error) {
      console.error(`Failed to fetch exercise ${id}:`, error);
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results.filter(
    (result): result is ExerciseByIdResponse => result !== null
  );
}
