import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { CreateRoutineRequest } from "@/types/db";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { user_id, routine_name, exercises }: CreateRoutineRequest =
    await request.json();

  let newRoutineId: string | undefined;

  try {
    const { data: newRoutine, error: routineError } = await supabase
      .from("workout_routines")
      .insert([{ user_id: user_id, name: routine_name }])
      .select("id")
      .single();

    if (routineError) throw routineError;

    newRoutineId = newRoutine.id;

    const routineExercisesData = exercises.map((exercise) => ({
      routine_id: newRoutineId,
      exercise_api_id: exercise.exercise_api_id,
      order: exercise.order,
      sets: exercise.sets || null,
      reps: exercise.reps || null,
    }));

    const { data: newExercises, error: exercisesError } = await supabase
      .from("routine_exercises")
      .insert(routineExercisesData)
      .select();

    if (exercisesError) throw exercisesError;

    return NextResponse.json(
      {
        routine_id: newRoutineId,
        exercises: newExercises,
      },
      { status: 201 }
    );
  } catch (error) {
    if (newRoutineId) {
      console.warn(`Rolling back routine creation for ID: ${newRoutineId}`);
      await supabase.from("workout_routines").delete().eq("id", newRoutineId);
    }
    console.error("An error occurred during routine creation:", error);
    return NextResponse.json(
      { error: "Failed to create routine due to an error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("routine_exercises").select("*");

  if (error) {
    console.error("Error fetching routines:", error);
    return NextResponse.json(
      { error: "Failed to fetch routines" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
