"use client";

import { Routine } from "@/types/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Target,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface WorkoutCompleteProps {
  routine: Routine;
  completedCount: number;
  skippedCount: number;
  totalCount: number;
  onFinish: () => void;
  onRestart: () => void;
}

export default function WorkoutComplete({
  routine,
  completedCount,
  skippedCount,
  totalCount,
  onFinish,
  onRestart,
}: WorkoutCompleteProps) {
  const completionRate = Math.round((completedCount / totalCount) * 100);

  const getCompletionMessage = () => {
    if (completionRate === 100) {
      return "Incredible! You completed every exercise!";
    } else if (completionRate >= 80) {
      return "Great job! You crushed this workout!";
    } else if (completionRate >= 60) {
      return "Well done! You made solid progress!";
    } else {
      return "Good effort! Every step counts!";
    }
  };

  const getCompletionColor = () => {
    if (completionRate >= 80) return "text-green-600";
    if (completionRate >= 60) return "text-blue-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Workout Complete!</CardTitle>
          <p className={`text-lg font-medium ${getCompletionColor()}`}>
            {getCompletionMessage()}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Routine Info */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">{routine.name}</h3>
            <p className="text-sm text-muted-foreground">
              Completed on{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <Separator />

          {/* Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {completedCount}
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Completed
                </p>
              </div>

              <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <XCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-600">
                    {skippedCount}
                  </span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  Skipped
                </p>
              </div>
            </div>

            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-primary">
                  {completionRate}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Exercises:</span>
              <span className="font-medium">{totalCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Sets:</span>
              <span className="font-medium">
                {routine.routine_exercises.reduce(
                  (sum, ex) => sum + (ex.sets || 0),
                  0
                )}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Reps:</span>
              <span className="font-medium">
                {routine.routine_exercises.reduce(
                  (sum, ex) => sum + (ex.reps || 0),
                  0
                )}
              </span>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={onFinish}>
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button variant="outline" className="w-full" onClick={onRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Workout
            </Button>
          </div>

          {/* Achievement Badge */}
          {completionRate === 100 && (
            <div className="text-center">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
              >
                🏆 Perfect Workout!
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
