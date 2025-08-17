import { Suspense } from "react";
import OldExerciseCard from "@/components/common/old_exerciseCard";
import { getExerciseById } from "@/lib/api";
import ExistingRoutines from "@/components/routines/ExistingRoutines";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Page() {
  const fetchPromise = getExerciseById("ztAa1RK");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1>Workout Routines</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ExistingRoutines />
        </Suspense>
        <Button asChild>
          <Link href="/routines/new" className="flex items-center gap-2">
            <Plus />
            Create New Routine
          </Link>
        </Button>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OldExerciseCard fetchPromise={fetchPromise} />
          </div>
        </Suspense>
      </div>
    </Suspense>
  );
}
