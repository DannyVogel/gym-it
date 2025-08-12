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
