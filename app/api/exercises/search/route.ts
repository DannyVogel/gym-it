import { NextRequest, NextResponse } from "next/server";
import { searchExercises } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");
    if (!q)
      return NextResponse.json(
        { error: "Query parameter 'query' is required" },
        { status: 400 }
      );
    const response = await searchExercises({ q });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise" },
      { status: 500 }
    );
  }
}
