"use client";

import { useState } from "react";
import { CreateRoutineExercise } from "@/types/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewRoutinePage() {
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<CreateRoutineExercise[]>([
    { exercise_api_id: "", order: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleExerciseChange = (
    index: number,
    field: keyof CreateRoutineExercise,
    value: string | number
  ) => {
    const newExercises = [...exercises];
    // Convert string Inputs to numbers for 'sets' and 'reps'
    if (field === "sets" || field === "reps") {
      newExercises[index][field] = value ? Number(value) : undefined;
    } else if (field === "exercise_api_id") {
      newExercises[index][field] = String(value);
    } else {
      newExercises[index][field] = Number(value);
    }
    setExercises(newExercises);
  };

  const addExercise = () => {
    const nextOrder =
      exercises.length > 0 ? exercises[exercises.length - 1].order + 1 : 1;
    setExercises([...exercises, { exercise_api_id: "", order: nextOrder }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/routines", {
        method: "POST",
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
      setMessage(`Successfully created routine: ${routineName}`);
      setRoutineName("");
      setExercises([{ exercise_api_id: "", order: 1 }]);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Routine</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="routineName"
            className="block text-sm font-medium text-gray-700"
          >
            Routine Name
          </label>
          <Input
            id="routineName"
            type="text"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">Exercises</h2>
        {exercises.map((exercise, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md">
            <h3 className="font-medium mb-2">Exercise #{exercise.order}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  API ID
                </label>
                <Input
                  type="text"
                  value={exercise.exercise_api_id}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      "exercise_api_id",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sets (optional)
                </label>
                <Input
                  type="number"
                  value={exercise.sets || ""}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reps (optional)
                </label>
                <Input
                  type="number"
                  value={exercise.reps || ""}
                  onChange={(e) =>
                    handleExerciseChange(index, "reps", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={addExercise}
          className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Add Another Exercise
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Routine"}
        </Button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
