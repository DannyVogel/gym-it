"use client";

import { Routine } from "@/types/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell } from "lucide-react";

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
          <div className="space-y-2">
            {routine.routine_exercises.map((exercise, index) => (
              <div
                key={exercise.exercise_api_id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {index + 1}.
                    </span>
                    <span className="text-sm font-medium truncate">
                      Exercise {index + 1}
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
            ))}
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
