import { use } from 'react';
import { Card } from '@/components/ui/card';

export default function ExerciseCard({ title, description, fetchPromise }: { title: string; description: string, fetchPromise: Promise<any> }) {
    const data = use(fetchPromise);
    return (
        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
            {data && <p className="text-sm text-gray-500 mt-2">{data}</p>}
        </Card>
    );
}