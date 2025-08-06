import Link from 'next/link'
import { Button } from "@/components/ui/button"
import ExerciseCard from "@/components/common/excerciseCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Gym IT</h1>
      <p className="text-lg mb-8">Your personal fitness management system.</p>
      <Button className="mb-4" asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>

    </div>
  );
}
