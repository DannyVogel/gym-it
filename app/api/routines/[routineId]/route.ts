import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ routineId: string }> }
) {
  try {
    // Get user session
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { routineId } = await params;
    const supabase = await createClient();

    // Fetch the specific routine with its exercises
    const { data: routine, error: routineError } = await supabase
      .from("workout_routines")
      .select("*")
      .eq("id", routineId)
      .eq("user_id", session.user.id)
      .single();

    if (routineError) {
      console.error("Error fetching routine:", routineError);
      return NextResponse.json(
        { error: "Failed to fetch routine" },
        { status: 500 }
      );
    }

    if (!routine) {
      return NextResponse.json({ error: "Routine not found" }, { status: 404 });
    }

    // Fetch the routine exercises
    const { data: exercises, error: exercisesError } = await supabase
      .from("routine_exercises")
      .select("*")
      .eq("routine_id", routineId)
      .order("order");

    if (exercisesError) {
      console.error("Error fetching routine exercises:", exercisesError);
      return NextResponse.json(
        { error: "Failed to fetch routine exercises" },
        { status: 500 }
      );
    }

    // Combine routine with exercises
    const routineWithExercises = {
      ...routine,
      routine_exercises: exercises || [],
    };

    return NextResponse.json(routineWithExercises);
  } catch (error) {
    console.error("Error in routine fetch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
