import { Suspense } from 'react';
import ExerciseCard from "@/components/common/excerciseCard";
import { getExerciseById } from "@/lib/api";

export default function Page() {
    const fetchPromise = getExerciseById("ztAa1RK");
    return (
        <div>
            <h1>My Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ExerciseCard fetchPromise={fetchPromise} />
                </div>
            </Suspense>

        </div>
    );
}