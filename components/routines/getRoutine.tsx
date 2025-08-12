"use client";
import { useState } from 'react';

export default function GetRoutine() {
    const [routines, setRoutines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRoutines = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/routines')
            if (!response.ok)
                throw new Error('Failed to fetch routines');
            const data = await response.json();
            setRoutines(data);
        } catch (error) {
            console.error("Error fetching routines:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchRoutines} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Fetch Routines'}
            </button>
            <ul>
                {routines.map((routine) => (
                    <li key={routine.id}>{routine.name}</li>
                ))}
            </ul>
        </div>
    );
}