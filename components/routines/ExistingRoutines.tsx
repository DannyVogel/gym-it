import { getRoutines } from "@/lib/db";

export default async function ExistingRoutines() {
  const routines = await getRoutines();

  if (!routines) return null;
  return (
    <div>
      <h1>Available Routines</h1>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>{routine.name}</li>
        ))}
      </ul>
    </div>
  );
}
