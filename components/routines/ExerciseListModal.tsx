"use client";

import { useState, useEffect } from "react";
import { Routine } from "@/types/db";
import { Exercise } from "@/types/excercisedb-api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dumbbell } from "lucide-react";
import { getExercisesByIds } from "@/lib/api";
import Image from "next/image";

interface ExerciseListModalProps {
  routine: Routine | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExerciseListModal({
  routine,
  isOpen,
  onClose,
}: ExerciseListModalProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && routine) {
      setIsLoading(true);
      const exerciseIds = routine.routine_exercises.map(
        (ex) => ex.exercise_api_id
      );

      getExercisesByIds(exerciseIds)
        .then((responses) => {
          const exerciseData = responses.map((response) => response.data);
          setExercises(exerciseData);
        })
        .catch((error) => {
          console.error("Failed to fetch exercise details:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, routine]);

  if (!routine) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            {routine.name}
          </DialogTitle>
          <DialogDescription>
            View all exercises in this workout routine with their sets and reps.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-muted-foreground">
                  Loading exercises...
                </div>
              </div>
            ) : (
              routine.routine_exercises.map((exercise, index) => {
                const exerciseData = exercises.find(
                  (ex) => ex.exerciseId === exercise.exercise_api_id
                );
                return (
                  <div key={exercise.exercise_api_id}>
                    <div className="flex items-center justify-between p-3 hover:border-2 hover:border-primary/50 border-2 border-transparent rounded-md transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}.
                          </span>
                          {exerciseData?.gifUrl && (
                            <div className="w-12 h-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                              <Image
                                src={exerciseData.gifUrl}
                                alt={exerciseData.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                width={100}
                                height={100}
                                unoptimized
                              />
                            </div>
                          )}
                          <span className="text-sm font-medium truncate">
                            {exerciseData?.name || `Exercise ${index + 1}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                        {exercise.sets && (
                          <div className="text-xs text-muted-foreground">
                            {exercise.sets} sets
                          </div>
                        )}
                        {exercise.reps && (
                          <div className="text-xs text-muted-foreground">
                            {exercise.reps} reps
                          </div>
                        )}
                      </div>
                    </div>
                    {index < routine.routine_exercises.length - 1 && (
                      <Separator className="mx-3" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {routine.routine_exercises.length} exercises
          </div>
          <div className="text-sm text-muted-foreground">
            {routine.routine_exercises.reduce(
              (sum, ex) => sum + (ex.sets || 0),
              0
            )}{" "}
            total sets
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
