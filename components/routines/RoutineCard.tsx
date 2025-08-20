"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Routine } from "@/types/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Dumbbell, Repeat, Target } from "lucide-react";
import ExerciseListModal from "./ExerciseListModal";

interface RoutineCardProps {
  routine: Routine;
}

export default function RoutineCard({ routine }: RoutineCardProps) {
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const router = useRouter();

  const handleStartWorkout = (routineId: string, routineName: string) => {
    console.log(
      `Starting workout for routine: ${routineName} (ID: ${routineId})`
    );
    router.push(`/workout/${routineId}`);
  };

  const exerciseCount = routine.routine_exercises.length;
  const totalSets = routine.routine_exercises.reduce(
    (sum, exercise) => sum + (exercise.sets || 0),
    0
  );
  const totalReps = routine.routine_exercises.reduce(
    (sum, exercise) => sum + (exercise.reps || 0),
    0
  );

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg group-hover:text-primary transition-colors truncate">
              {routine.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1 text-xs">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {new Date(routine.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Exercise List Preview */}
            {exerciseCount > 0 && (
              <div className="pt-3 border-t">
                <div
                  className="flex items-center justify-center gap-2 p-2 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExerciseModalOpen(true);
                  }}
                >
                  <Dumbbell className="w-6 h-6 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {exerciseCount}{" "}
                    {exerciseCount === 1 ? "Exercise" : "Exercises"}
                  </p>
                </div>
              </div>
            )}

            {/* Sets and Reps Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Repeat className="w-4 h-4 text-muted-foreground" />
                  <div className="text-lg font-semibold">{totalSets}</div>
                </div>
                <div className="text-xs text-muted-foreground">Total Sets</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <div className="text-lg font-semibold">{totalReps}</div>
                </div>
                <div className="text-xs text-muted-foreground">Total Reps</div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardContent className="pt-0">
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleStartWorkout(routine.id, routine.name);
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Workout
          </Button>
        </CardContent>
      </Card>

      <ExerciseListModal
        routine={routine}
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
      />
    </>
  );
}
