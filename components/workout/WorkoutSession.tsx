"use client";

import { useState } from "react";
import { Routine } from "@/types/db";
import { Exercise } from "@/types/excercisedb-api";
import WorkoutExerciseCard from "./WorkoutExerciseCard";
import WorkoutProgress from "./WorkoutProgress";
import WorkoutComplete from "./WorkoutComplete";
import { Button } from "@/components/ui/button";
import { X, Pause, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WorkoutSessionProps {
  routine: Routine;
  exercises: Exercise[];
  onComplete: () => void;
  onExit: () => void;
}

export default function WorkoutSession({
  routine,
  exercises,
  onComplete,
  onExit,
}: WorkoutSessionProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [skippedExercises, setSkippedExercises] = useState<number[]>([]);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const totalExercises = routine.routine_exercises.length;
  const currentExercise = routine.routine_exercises[currentExerciseIndex];
  const currentExerciseData = exercises.find(
    (ex) => ex.exerciseId === currentExercise?.exercise_api_id
  );

  const handleCompleteExercise = () => {
    setCompletedExercises(prev => [...prev, currentExerciseIndex]);
    moveToNextExercise();
  };

  const handleSkipExercise = () => {
    setSkippedExercises(prev => [...prev, currentExerciseIndex]);
    moveToNextExercise();
  };

  const moveToNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setIsWorkoutComplete(true);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      // Remove from completed/skipped if going back
      setCompletedExercises(prev => prev.filter(index => index !== currentExerciseIndex));
      setSkippedExercises(prev => prev.filter(index => index !== currentExerciseIndex));
    }
  };

  const handleExitWorkout = () => {
    setShowExitDialog(false);
    onExit();
  };

  if (isWorkoutComplete) {
    return (
      <WorkoutComplete
        routine={routine}
        completedCount={completedExercises.length}
        skippedCount={skippedExercises.length}
        totalCount={totalExercises}
        onFinish={onComplete}
        onRestart={() => {
          setCurrentExerciseIndex(0);
          setCompletedExercises([]);
          setSkippedExercises([]);
          setIsWorkoutComplete(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">{routine.name}</h1>
              <p className="text-sm text-muted-foreground">
                Exercise {currentExerciseIndex + 1} of {totalExercises}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitDialog(true)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <WorkoutProgress
            current={currentExerciseIndex + 1}
            total={totalExercises}
            completed={completedExercises.length}
            skipped={skippedExercises.length}
          />
        </div>
      </div>

      {/* Exercise Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentExercise && currentExerciseData && (
          <WorkoutExerciseCard
            exercise={currentExercise}
            exerciseData={currentExerciseData}
            exerciseNumber={currentExerciseIndex + 1}
            onComplete={handleCompleteExercise}
            onSkip={handleSkipExercise}
            onPrevious={currentExerciseIndex > 0 ? handlePreviousExercise : undefined}
            isPaused={isPaused}
          />
        )}
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Workout?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit your workout? Your progress will not be saved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Continue Workout
            </Button>
            <Button variant="destructive" onClick={handleExitWorkout}>
              Exit Workout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
