"use client";

import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Circle } from "lucide-react";

interface WorkoutProgressProps {
  current: number;
  total: number;
  completed: number;
  skipped: number;
}

export default function WorkoutProgress({
  current,
  total,
  completed,
  skipped,
}: WorkoutProgressProps) {
  const progressPercentage = ((current - 1) / total) * 100;

  return (
    <div className="space-y-3 mt-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">{completed}</span>
          <span className="text-xs text-muted-foreground">completed</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Circle className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{total - current + 1}</span>
          <span className="text-xs text-muted-foreground">remaining</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <XCircle className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium">{skipped}</span>
          <span className="text-xs text-muted-foreground">skipped</span>
        </div>
      </div>
    </div>
  );
}
