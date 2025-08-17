"use client";

import { useState } from "react";
import { CreateRoutineExercise } from "@/types/db";
import { Exercise } from "@/types/excercisedb-api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ExerciseSearch from "./ExerciseSearch";
import RoutineBuilder from "./RoutineBuilder";

export default function NewRoutinePage() {
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<CreateRoutineExercise[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddToRoutine = (exercise: Exercise) => {
    if (exercises.some((e) => e.exercise_api_id === exercise.exerciseId)) {
      toast.warning("Exercise Already Added", {
        description: `${exercise.name} is already in your routine.`,
      });
      return;
    }

    const nextOrder =
      exercises.length > 0 ? Math.max(...exercises.map((e) => e.order)) + 1 : 1;
    const newExercise: CreateRoutineExercise = {
      exercise_api_id: exercise.exerciseId,
      order: nextOrder,
      sets: undefined,
      reps: undefined,
      exerciseName: exercise.name,
    };

    setExercises([...exercises, newExercise]);
    toast.success("Exercise Added", {
      description: `${exercise.name} has been added to your routine.`,
    });
  };

  const handleUpdateExercise = (
    index: number,
    field: keyof CreateRoutineExercise,
    value: string | number
  ) => {
    const newExercises = [...exercises];

    switch (field) {
      case "sets":
      case "reps":
        newExercises[index][field] = value ? Number(value) : undefined;
        break;
      case "order":
        newExercises[index][field] = Number(value);
        break;
      case "exercise_api_id":
      case "exerciseName":
        newExercises[index][field] = String(value);
        break;
    }

    setExercises(newExercises);
  };

  const handleRemoveExercise = (index: number) => {
    const removedExercise = exercises[index];
    const newExercises = exercises.filter((_, i) => i !== index);
    const reorderedExercises = newExercises.map((exercise, i) => ({
      ...exercise,
      order: i + 1,
    }));
    setExercises(reorderedExercises);
    toast.info("Exercise Removed", {
      description: `${removedExercise.exerciseName} has been removed from your routine.`,
    });
  };

  const isExerciseAdded = (exerciseId: string) => {
    return exercises.some((e) => e.exercise_api_id === exerciseId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (exercises.length === 0) {
      toast.warning("No Exercises", {
        description: "Please add at least one exercise to your routine.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routine_name: routineName,
          exercises: exercises.map((exercise) => ({
            exercise_api_id: exercise.exercise_api_id,
            order: exercise.order,
            sets: exercise.sets || null,
            reps: exercise.reps || null,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create routine");
      }

      toast.success("Success!", {
        description: `Successfully created routine: ${routineName}`,
      });

      // Reset form
      setRoutineName("");
      setExercises([]);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to create routine",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create New Routine
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routine Name
              </label>
              <Input
                type="text"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                placeholder="Enter routine name"
                className="max-w-md"
                required
              />
            </div>
          </form>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Search Results Panel */}
          <ExerciseSearch
            onAddToRoutine={handleAddToRoutine}
            isExerciseAdded={isExerciseAdded}
          />

          {/* Routine Builder Panel */}
          <RoutineBuilder
            exercises={exercises}
            onUpdateExercise={handleUpdateExercise}
            onRemoveExercise={handleRemoveExercise}
            onSubmit={handleSubmit}
            routineName={routineName}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
