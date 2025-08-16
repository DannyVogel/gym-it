import { CreateRoutineRequest } from "@/types/db";
import { getRoutines, createRoutine } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { routine_name, exercises }: CreateRoutineRequest =
    await request.json();

  return await createRoutine(routine_name, exercises);
}

export async function GET() {
  try {
    const routines = await getRoutines();

    if (routines === null) {
      return NextResponse.json(
        { error: "Failed to fetch routines" },
        { status: 500 }
      );
    }

    return NextResponse.json(routines, { status: 200 });
  } catch (error) {
    console.error("API Error in GET /api/routines:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
