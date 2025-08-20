import { CreateRoutineExercise, Routines } from "@/types/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function getRoutines(): Promise<Routines | null> {
  try {
    const supabase = await createClient();
    const session = await auth();

    if (!session?.user) {
      console.error("Unauthorized access attempt");
      return null;
    }

    const userId = session?.user.id;
    if (!userId) {
      console.error("User ID is required");
      return null;
    }

    const { data, error } = await supabase
      .from("workout_routines")
      .select(
        `
        id,
        name,
        created_at,
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
      return null;
    }

    return data as Routines;
  } catch (error) {
    console.error("Error in getRoutines:", error);
    return null;
  }
}

export async function createRoutine(
  routineName: string,
  exercises: CreateRoutineExercise[]
) {
  const supabase = await createClient();
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
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
      try {
        await supabase.from("workout_routines").delete().eq("id", newRoutineId);
      } catch (cleanupError) {
        console.error("Failed to cleanup routine:", cleanupError);
      }
    }

    console.error("An error occurred during routine creation:", error);
    return NextResponse.json(
      { error: "Failed to create routine due to an error" },
      { status: 500 }
    );
  }
}
