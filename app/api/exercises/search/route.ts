import { NextRequest, NextResponse } from "next/server";
import { searchExercises } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const threshold = parseFloat(searchParams.get("threshold") || "0.3");

    if (
      offset < 0 ||
      limit < 1 ||
      limit > 50 ||
      threshold < 0 ||
      threshold > 1
    ) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const response = await searchExercises({
      q,
      offset,
      limit,
      threshold,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercises" },
      { status: 500 }
    );
  }
}
