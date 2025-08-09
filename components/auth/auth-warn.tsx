'use client';
import { useSearchParams } from 'next/navigation'
import { Card } from "@/components/ui/card";

export function AuthWarn() {
    const searchParams = useSearchParams()
    const auth = searchParams.get('auth')
    if (!auth || auth !== 'false') return

    return (
        <Card className="max-w-md mx-auto p-6 shadow-md my-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Authentication Required</h2>
            <p className="text-gray-700 mb-6">Please sign in to access this feature.</p>
        </Card>
    );
}