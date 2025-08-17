"use client";

import { useState } from "react";
import { Exercise, ExerciseSearchResponse } from "@/types/excercisedb-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { Search } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

interface ExerciseSearchProps {
  onAddToRoutine: (exercise: Exercise) => void;
  isExerciseAdded: (exerciseId: string) => boolean;
}

export default function ExerciseSearch({
  onAddToRoutine,
  isExerciseAdded,
}: ExerciseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalExercises, setTotalExercises] = useState(0);
  const [limit] = useState(10); // Results per page

  const handleSearch = async (page: number = 1) => {
    if (searchQuery.length < 3) {
      toast.warning("Search Term Too Short", {
        description: "Please enter at least 3 characters to search.",
      });
      return;
    }

    setSearchLoading(true);
    setHasSearched(true);

    try {
      const offset = (page - 1) * limit;
      const params = new URLSearchParams({
        q: searchQuery,
        offset: offset.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(`/api/exercises/search?${params}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch search results");
      }

      const searchResponse: ExerciseSearchResponse = await response.json();

      setSearchResults(searchResponse.data);
      setCurrentPage(searchResponse.metadata.currentPage);
      setTotalPages(searchResponse.metadata.totalPages);
      setTotalExercises(searchResponse.metadata.totalExercises);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search Error", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      setSearchResults([]);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalExercises(0);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(1); // Always start from page 1 on new search
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      handleSearch(page);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setCurrentPage(1);
    setTotalPages(1);
    setTotalExercises(0);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Search & Add Exercises</h2>

      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search for exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={() => handleSearch(1)}
          disabled={searchLoading || searchQuery.length < 3}
          className="shrink-0"
        >
          {searchLoading ? (
            <svg
              className="animate-spin h-4 w-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <Search className="h-4 w-4 mr-1" />
          )}
          {searchLoading ? "Searching..." : "Search"}
        </Button>
        {hasSearched && (
          <Button
            type="button"
            variant="outline"
            onClick={clearSearch}
            className="shrink-0"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Results Info */}
      {hasSearched && !searchLoading && searchResults.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {(currentPage - 1) * limit + 1}-
          {Math.min(currentPage * limit, totalExercises)} of {totalExercises}{" "}
          exercises
        </div>
      )}

      {/* Search Status & Results */}
      <div className="space-y-4">
        {!searchLoading && hasSearched && searchResults.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>No results found for "{searchQuery}"</p>
            <p className="text-sm mt-2">
              Try a different search term or check your spelling.
            </p>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center text-muted-foreground py-8">
            <p>Search for exercises to add to your routine.</p>
            <p className="text-sm mt-2">
              Try searching for "push", "squat", "bench", etc.
            </p>
          </div>
        )}

        {/* Exercise Results */}
        <div className="max-h-[500px] overflow-y-auto space-y-4">
          {searchResults.map((exercise) => (
            <ExerciseCard
              key={exercise.exerciseId}
              exercise={exercise}
              onAddToRoutine={onAddToRoutine}
              isAdded={isExerciseAdded(exercise.exerciseId)}
            />
          ))}
        </div>

        {/* Pagination */}
        {hasSearched && !searchLoading && totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page as number);
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
