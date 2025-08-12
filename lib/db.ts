import { CreateRoutineExercise } from "@/types/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function getRoutines() {
  try {
    const supabase = await createClient();
    const session = await auth();
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );

    const { data, error } = await supabase
      .from("workout_routines")
      .select(
        `
          id,
          name,
          routine_exercises (
            exercise_api_id,
            order,
            sets,
            reps
          )
          `
      )
      .eq("user_id", userId)
      .order("order", { foreignTable: "routine_exercises" });

    if (error) {
      console.error("Error fetching routines:", error);
      return NextResponse.json(
        { error: "Failed to fetch routines" },
        { status: 500 }
      );
    }
    console.log("routines data", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in getRoutines:", error);
    return NextResponse.json(
      { error: "Failed to fetch routines" },
      { status: 500 }
    );
  }
}

export async function createRoutine(
  routineName: string,
  exercises: CreateRoutineExercise[]
) {
  const supabase = await createClient();
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session?.user.id;

  let newRoutineId: string | undefined;

  try {
    const { data: newRoutine, error: routineError } = await supabase
      .from("workout_routines")
      .insert([{ user_id: userId, name: routineName }])
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
