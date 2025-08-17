"use client";

import { CreateRoutineExercise } from "@/types/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, GripVertical } from "lucide-react";

// Extended type for routine exercises with display name
type RoutineExercise = CreateRoutineExercise & { exerciseName: string };

interface RoutineExerciseCardProps {
  exercise: RoutineExercise;
  index: number;
  onUpdateExercise: (
    index: number,
    field: keyof CreateRoutineExercise,
    value: string | number
  ) => void;
  onRemoveExercise: (index: number) => void;
}

export default function RoutineExerciseCard({
  exercise,
  index,
  onUpdateExercise,
  onRemoveExercise,
}: RoutineExerciseCardProps) {
  const isConfigured = exercise.sets && exercise.reps;
  const hasPartialConfig =
    (exercise.sets && !exercise.reps) || (!exercise.sets && exercise.reps);

  const handleSetsChange = (value: string) => {
    onUpdateExercise(index, "sets", value);
  };

  const handleRepsChange = (value: string) => {
    onUpdateExercise(index, "reps", value);
  };

  const handleRemove = () => {
    onRemoveExercise(index);
  };

  // Quick set buttons for common rep/set combinations
  const quickSetOptions = [
    { sets: 3, reps: 10, label: "3×10" },
    { sets: 3, reps: 12, label: "3×12" },
    { sets: 4, reps: 8, label: "4×8" },
    { sets: 5, reps: 5, label: "5×5" },
  ];

  const applyQuickSet = (sets: number, reps: number) => {
    onUpdateExercise(index, "sets", sets);
    onUpdateExercise(index, "reps", reps);
  };

  return (
    <Card
      className={`p-4 transition-all duration-200 ${
        isConfigured
          ? "border-l-4 border-l-green-500 bg-green-50/30"
          : hasPartialConfig
          ? "border-l-4 border-l-yellow-500 bg-yellow-50/30"
          : "border-l-4 border-l-gray-300 hover:border-l-blue-500"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-2 flex-1">
          {/* Drag Handle */}
          <div className="mt-1 text-gray-400 cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              {exercise.exerciseName}
            </h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Exercise #{exercise.order}
              </Badge>
              {isConfigured && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-100 text-green-800"
                >
                  Configured
                </Badge>
              )}
              {hasPartialConfig && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-yellow-100 text-yellow-800"
                >
                  Incomplete
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Configuration Section */}
      <div className="space-y-4">
        {/* Sets and Reps Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sets
            </label>
            <Input
              type="number"
              value={exercise.sets || ""}
              onChange={(e) => handleSetsChange(e.target.value)}
              placeholder="0"
              min="1"
              max="20"
              className={`transition-colors ${
                exercise.sets ? "border-green-300 focus:border-green-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reps
            </label>
            <Input
              type="number"
              value={exercise.reps || ""}
              onChange={(e) => handleRepsChange(e.target.value)}
              placeholder="0"
              min="1"
              max="100"
              className={`transition-colors ${
                exercise.reps ? "border-green-300 focus:border-green-500" : ""
              }`}
            />
          </div>
        </div>

        {/* Quick Set Options */}
        <div>
          <p className="text-xs text-gray-600 mb-2">Quick presets:</p>
          <div className="flex flex-wrap gap-2">
            {quickSetOptions.map((option) => {
              const isActive =
                exercise.sets === option.sets && exercise.reps === option.reps;
              return (
                <Button
                  key={option.label}
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyQuickSet(option.sets, option.reps)}
                  className={`text-xs h-7 ${
                    isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Configuration Status */}
        {exercise.sets && exercise.reps && (
          <div className="text-center py-2 bg-green-50 rounded border border-green-200">
            <p className="text-sm text-green-800 font-medium">
              {exercise.sets} sets × {exercise.reps} reps ={" "}
              {exercise.sets * exercise.reps} total reps
            </p>
          </div>
        )}

        {hasPartialConfig && (
          <div className="text-center py-2 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              {exercise.sets && !exercise.reps && "Please set number of reps"}
              {!exercise.sets && exercise.reps && "Please set number of sets"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
