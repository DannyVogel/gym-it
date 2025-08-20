import { Suspense } from "react";
import ExistingRoutines from "@/components/routines/ExistingRoutines";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-4 flex flex-col justify-center items-center gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ExistingRoutines />
        </Suspense>
        <Separator />
        <Button asChild>
          <Link href="/routines/new" className="flex items-center gap-2">
            <Plus />
            Create New Routine
          </Link>
        </Button>
      </div>
    </Suspense>
  );
}
