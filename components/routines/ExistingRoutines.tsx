import { getRoutines } from "@/lib/db";
import { Dumbbell } from "lucide-react";
import RoutineCard from "./RoutineCard";

export default async function ExistingRoutines() {
  const routines = await getRoutines();

  if (!routines || routines.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Dumbbell className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No routines yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first workout routine to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Workout Routines</h2>
        <p className="text-muted-foreground">
          Click on a routine to start your workout
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {routines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
}
