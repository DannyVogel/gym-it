import { CreateRoutineRequest } from "@/types/db";
import { getRoutines, createRoutine } from "@/lib/db";

export async function POST(request: Request) {
  const { routine_name, exercises }: CreateRoutineRequest =
    await request.json();

  return await createRoutine(routine_name, exercises);
}

export async function GET() {
  return await getRoutines();
}
