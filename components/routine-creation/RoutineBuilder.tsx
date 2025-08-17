"use client";

import { CreateRoutineExercise } from "@/types/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoutineExerciseCard from "./RoutineExerciseCard";

// Extended type for routine exercises with display name
type RoutineExercise = CreateRoutineExercise & { exerciseName: string };

interface RoutineBuilderProps {
  exercises: RoutineExercise[];
  onUpdateExercise: (
    index: number,
    field: keyof CreateRoutineExercise,
    value: string | number
  ) => void;
  onRemoveExercise: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  routineName: string;
  loading: boolean;
}

export default function RoutineBuilder({
  exercises,
  onUpdateExercise,
  onRemoveExercise,
  onSubmit,
  routineName,
  loading,
}: RoutineBuilderProps) {
  const isFormValid = exercises.length > 0 && routineName.trim() !== "";

  // Calculate routine stats
  const totalExercises = exercises.length;
  const configuredExercises = exercises.filter(
    (ex) => ex.sets && ex.reps
  ).length;
  const totalSets = exercises.reduce((sum, ex) => sum + (ex.sets || 0), 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div>
      {/* Header with Stats */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Routine</h2>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {totalExercises} {totalExercises === 1 ? "exercise" : "exercises"}
          </Badge>
          {totalSets > 0 && (
            <Badge variant="outline" className="text-xs">
              {totalSets} total sets
            </Badge>
          )}
        </div>
      </div>

      {/* Empty State */}
      {exercises.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-3">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No exercises yet
              </h3>
              <p className="text-muted-foreground">
                Search and add exercises to build your routine.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Progress Indicator */}
          {configuredExercises < totalExercises && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-600 mr-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Configure sets and reps
                  </p>
                  <p className="text-xs text-yellow-700">
                    {configuredExercises}/{totalExercises} exercises configured
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Exercise List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto mb-6">
            {exercises.map((exercise, index) => (
              <RoutineExerciseCard
                key={`${exercise.exercise_api_id}-${exercise.order}`}
                exercise={exercise}
                index={index}
                onUpdateExercise={onUpdateExercise}
                onRemoveExercise={onRemoveExercise}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t bg-white sticky bottom-0">
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  // Clear all sets/reps
                  exercises.forEach((_, index) => {
                    onUpdateExercise(index, "sets", "");
                    onUpdateExercise(index, "reps", "");
                  });
                }}
                className="flex-1"
                disabled={configuredExercises === 0}
              >
                Clear All Sets/Reps
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  // Set default 3x10 for all exercises
                  exercises.forEach((_, index) => {
                    onUpdateExercise(index, "sets", 3);
                    onUpdateExercise(index, "reps", 10);
                  });
                }}
                className="flex-1"
              >
                Set All 3×10
              </Button>
            </div>

            {/* Submit Button */}
            <form onSubmit={handleFormSubmit}>
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Routine...
                  </div>
                ) : (
                  `Create Routine${routineName ? ` "${routineName}"` : ""}`
                )}
              </Button>
            </form>

            {/* Form Validation Messages */}
            {!isFormValid && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {!routineName.trim() && exercises.length > 0
                    ? "Please enter a routine name"
                    : exercises.length === 0
                    ? "Add exercises to create your routine"
                    : "Ready to create routine"}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
