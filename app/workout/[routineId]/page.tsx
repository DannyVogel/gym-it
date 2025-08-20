"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Routine } from "@/types/db";
import { Exercise } from "@/types/excercisedb-api";
import { getExercisesByIds } from "@/lib/api";
import WorkoutSession from "@/components/workout/WorkoutSession";

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const routineId = params.routineId as string;
  
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch routine data - you'll need to implement this API endpoint
        const response = await fetch(`/api/routines/${routineId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch routine");
        }
        
        const routineData: Routine = await response.json();
        setRoutine(routineData);

        // Fetch exercise details
        const exerciseIds = routineData.routine_exercises.map(
          (ex) => ex.exercise_api_id
        );

        const exerciseResponses = await getExercisesByIds(exerciseIds);
        const exerciseData = exerciseResponses.map((response) => response.data);
        setExercises(exerciseData);
      } catch (err) {
        console.error("Error fetching workout data:", err);
        setError("Failed to load workout data");
      } finally {
        setIsLoading(false);
      }
    };

    if (routineId) {
      fetchRoutineData();
    }
  }, [routineId]);

  const handleWorkoutComplete = () => {
    // Navigate back to dashboard or routines page
    router.push("/dashboard");
  };

  const handleWorkoutExit = () => {
    // Navigate back with confirmation
    router.push("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading workout...</div>
          <div className="text-sm text-muted-foreground mt-1">
            Preparing your exercises
          </div>
        </div>
      </div>
    );
  }

  if (error || !routine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-destructive">
            {error || "Workout not found"}
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <WorkoutSession
      routine={routine}
      exercises={exercises}
      onComplete={handleWorkoutComplete}
      onExit={handleWorkoutExit}
    />
  );
}
