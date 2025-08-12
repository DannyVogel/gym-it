'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Exercise } from '@/types/excercisedb-api';

function SearchResults({ results }: { results: Exercise[] }) {
    return (
        <div className="space-y-2">
            {results.map((exercise) => (
                <div
                    key={exercise.exerciseId}
                    className="p-3 border rounded-md shadow-sm hover:bg-muted/50 cursor-pointer"
                >
                    <p className="font-medium">{exercise.name}</p>
                </div>
            ))}
        </div>
    );
}

export default function ExerciseSearch() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Exercise[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (query.length < 3) {
            toast('Search Term Too Short', {
                description: 'Please enter at least 3 characters to search.',
            });
            return;
        }

        setLoading(true);
        setHasSearched(true);

        try {
            const response = await fetch(`/api/exercises/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to fetch search results');
            }
            const exercises = await response.json();
            console.log("Search results:", exercises);
            setResults(exercises);
        } catch (error) {
            console.error('Search error:', error);
            toast('Search Error', {
                description: error instanceof Error ? error.message : 'An unexpected error occurred',
            });
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-4">
            <div className="flex w-full items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Search for an exercise..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                />
                <Button
                    onClick={handleSearch}
                    disabled={loading || query.length < 3}
                >
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </div>

            {loading && (
                <p className="text-sm text-center text-muted-foreground">
                    Searching...
                </p>
            )}

            {!loading && hasSearched && results.length === 0 && (
                <p className="text-sm text-center text-muted-foreground">
                    No results found.
                </p>
            )}

            {results.length > 0 && <SearchResults results={results} />}
        </div>
    );
}