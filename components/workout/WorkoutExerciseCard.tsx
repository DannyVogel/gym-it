"use client";

import { useState } from "react";
import { RoutineExercise } from "@/types/db";
import { Exercise } from "@/types/excercisedb-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  SkipForward,
  ChevronLeft,
  Target,
  Repeat,
  Clock,
  Info,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkoutExerciseCardProps {
  exercise: RoutineExercise;
  exerciseData: Exercise;
  exerciseNumber: number;
  onComplete: () => void;
  onSkip: () => void;
  onPrevious?: () => void;
  isPaused: boolean;
}

export default function WorkoutExerciseCard({
  exercise,
  exerciseData,
  exerciseNumber,
  onComplete,
  onSkip,
  onPrevious,
  isPaused,
}: WorkoutExerciseCardProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="space-y-6">
      {/* Exercise Card */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-2">
                {exerciseData.name}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Exercise {exerciseNumber}
                </Badge>
                {exerciseData.bodyParts.map((bodyPart) => (
                  <Badge key={bodyPart} variant="outline" className="text-xs">
                    {bodyPart}
                  </Badge>
                ))}
              </div>
            </div>
            <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="w-4 h-4 mr-1" />
                  Instructions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{exerciseData.name}</DialogTitle>
                  <DialogDescription>
                    Exercise instructions and details
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-4">
                  <div className="space-y-4">
                    {exerciseData.instructions.map((instruction, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium text-primary">
                          {index + 1}.
                        </span>{" "}
                        {instruction}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Exercise GIF */}
          {exerciseData.gifUrl && (
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={exerciseData.gifUrl}
                  alt={exerciseData.name}
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                  unoptimized
                  priority
                />
              </div>
            </div>
          )}

          {/* Exercise Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Repeat className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold">{exercise.sets || 0}</div>
              </div>
              <div className="text-sm text-muted-foreground">Sets</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Target className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold">{exercise.reps || 0}</div>
              </div>
              <div className="text-sm text-muted-foreground">Reps</div>
            </div>
          </div>

          {/* Target Muscles */}
          {exerciseData.targetMuscles.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Target Muscles</h4>
              <div className="flex flex-wrap gap-1">
                {exerciseData.targetMuscles.map((muscle) => (
                  <Badge key={muscle} variant="outline" className="text-xs">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          {exerciseData.equipments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Equipment</h4>
              <div className="flex flex-wrap gap-1">
                {exerciseData.equipments.map((equipment) => (
                  <Badge
                    key={equipment}
                    variant="secondary"
                    className="text-xs"
                  >
                    {equipment}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            className="h-14"
            onClick={onComplete}
            disabled={isPaused}
          >
            <Check className="w-5 h-5 mr-2" />
            Complete
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14"
            onClick={onSkip}
            disabled={isPaused}
          >
            <SkipForward className="w-5 h-5 mr-2" />
            Skip
          </Button>
        </div>

        {onPrevious && (
          <Button
            variant="ghost"
            className="w-full"
            onClick={onPrevious}
            disabled={isPaused}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous Exercise
          </Button>
        )}
      </div>

      {isPaused && (
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Workout Paused</span>
          </div>
        </div>
      )}
    </div>
  );
}
