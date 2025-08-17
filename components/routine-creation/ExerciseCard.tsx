"use client";

import { useState } from "react";
import Image from "next/image";
import { Exercise, ExerciseByIdResponse } from "@/types/excercisedb-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formatInstruction = (instruction: string) => {
  const parts = instruction.match(/^Step:(\d+)(.*)$/);
  return {
    step: parts ? `${parts[1]}:` : "",
    description: parts ? parts[2] : instruction,
  };
};

interface ExerciseCardProps {
  exercise: Exercise;
  onAddToRoutine: (exercise: Exercise) => void;
  isAdded: boolean;
}

export default function ExerciseCard({
  exercise,
  onAddToRoutine,
  isAdded,
}: ExerciseCardProps) {
  const [exerciseDetails, setExerciseDetails] =
    useState<ExerciseByIdResponse | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const fetchExerciseDetails = async () => {
    if (exerciseDetails || detailsLoading) return;

    setDetailsLoading(true);
    setDetailsError(null);

    try {
      const response = await fetch(`/api/exercises/${exercise.exerciseId}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch exercise details: ${response.statusText}`
        );
      }
      const data = await response.json();
      setExerciseDetails(data);
    } catch (error) {
      console.error("Failed to fetch exercise details:", error);
      setDetailsError(
        error instanceof Error
          ? error.message
          : "Failed to load exercise details"
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleShowDetails = () => {
    if (!showDetails && !exerciseDetails) {
      fetchExerciseDetails();
    }
    setShowDetails(!showDetails);
  };

  const handleAddExercise = () => {
    onAddToRoutine(exercise);
  };

  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold uppercase mb-2 text-gray-900">
            {exercise.name}
          </h3>

          {/* Exercise Metadata Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {exercise.target && (
              <Badge variant="secondary" className="text-xs">
                Target: {exercise.target}
              </Badge>
            )}
            {exercise.bodyPart && (
              <Badge variant="outline" className="text-xs">
                {exercise.bodyPart}
              </Badge>
            )}
            {exercise.equipment && (
              <Badge variant="outline" className="text-xs">
                {exercise.equipment}
              </Badge>
            )}
          </div>
        </div>

        {/* Add Button */}
        <Button
          onClick={handleAddExercise}
          disabled={isAdded}
          size="sm"
          className="ml-2 shrink-0"
          variant={isAdded ? "secondary" : "default"}
        >
          <Plus className="h-4 w-4 mr-1" />
          {isAdded ? "Added" : "Add"}
        </Button>
      </div>

      {/* Details Toggle Section */}
      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={handleShowDetails}
          disabled={detailsLoading}
          className="w-full"
        >
          {detailsLoading
            ? "Loading Details..."
            : showDetails
            ? "Hide Details"
            : "Show Details & GIF"}
        </Button>

        {/* Exercise Details */}
        {showDetails && (
          <div className="space-y-3 border-t pt-3">
            {detailsError ? (
              <div className="text-center py-4">
                <p className="text-red-600 text-sm">{detailsError}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDetailsError(null);
                    fetchExerciseDetails();
                  }}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            ) : exerciseDetails ? (
              <>
                {/* Exercise GIF */}
                <div className="flex justify-center">
                  <div className="relative">
                    <Image
                      src={exerciseDetails.data.gifUrl}
                      alt={`${exerciseDetails.data.name} demonstration`}
                      width={200}
                      height={200}
                      unoptimized
                      className="rounded-lg border"
                      onError={() =>
                        setDetailsError("Failed to load exercise GIF")
                      }
                    />
                  </div>
                </div>

                {/* Instructions Accordion */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="instructions" className="border-none">
                    <AccordionTrigger className="text-sm hover:no-underline py-2">
                      View Instructions (
                      {exerciseDetails.data.instructions.length} steps)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm text-gray-600 pt-2">
                        {exerciseDetails.data.instructions.map(
                          (instruction, index) => {
                            const { step, description } =
                              formatInstruction(instruction);
                            return (
                              <div key={index} className="flex">
                                <span className="font-bold text-gray-800 mr-2 shrink-0">
                                  {step || `${index + 1}:`}
                                </span>
                                <span>{description}</span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Additional Exercise Info */}
                {exerciseDetails.data.secondaryMuscles?.length > 0 && (
                  <div className="pt-2 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Secondary Muscles:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {exerciseDetails.data.secondaryMuscles.map(
                        (muscle, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {muscle}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <div className="animate-pulse text-muted-foreground">
                  Loading exercise details...
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
