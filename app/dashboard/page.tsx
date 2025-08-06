import { Suspense } from 'react';
import ExerciseCard from "@/components/common/excerciseCard";
import { fetcher } from "@/lib/api";

export default function Page() {
    const fetchPromise = fetcher("example");
    return (
        <div>
            <h1>My Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ExerciseCard title="Cardio Workout" description="Improve your cardiovascular health with our cardio exercises." fetchPromise={fetchPromise} />
                </div>
            </Suspense>
        </div>
    );
}