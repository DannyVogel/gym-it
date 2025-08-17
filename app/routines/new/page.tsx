// app/routines/new/page.tsx
import { Metadata } from "next";
import NewRoutinePage from "@/components/routine-creation/NewRoutinePage";

export const metadata: Metadata = {
  title: "Create New Routine",
  description:
    "Build a custom workout routine with exercises and configurations",
};

export default function CreateRoutinePage() {
  return <NewRoutinePage />;
}
