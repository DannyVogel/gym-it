import { getExerciseById } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest, // Add this first parameter
  {
    params,
  }: {
    params: Promise<{ exerciseId: string }>;
  }
) {
  const { exerciseId } = await params;
  try {
    const exercise = await getExerciseById(exerciseId);
    return NextResponse.json(exercise);
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise" },
      { status: 500 }
    );
  }
}
