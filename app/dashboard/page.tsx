import { Suspense } from "react";
import ExerciseCard from "@/components/common/exerciseCard";
import { getExerciseById } from "@/lib/api";
import NewRoutineForm from "@/components/routines/addRoutine";
import GetRoutine from "@/components/routines/getRoutine";
import ExerciseSearch from "@/components/common/exerciseSearch";
import ExistingRoutines from "@/components/routines/ExistingRoutines";

export default function Page() {
  const fetchPromise = getExerciseById("ztAa1RK");
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>My Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ExistingRoutines />
      </Suspense>
      <p>Welcome to your dashboard!</p>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ExerciseCard fetchPromise={fetchPromise} />
        </div>
      </Suspense>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Search Exercises</h2>
        <ExerciseSearch />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Add New Routine</h2>
        <NewRoutineForm />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">View Routines</h2>
        <GetRoutine />
      </div>
    </div>
  );
}
