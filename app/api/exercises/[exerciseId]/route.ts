import { NextResponse } from "next/server";
import { getExerciseById } from "@/lib/api";

export async function GET({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
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
