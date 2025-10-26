import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = checkAdminAuth(request);
    if (authError) return authError;

    // Connect to database
    const { db } = await connectToDatabase();

    // Get all trainee registrations
    const trainees = await db
      .collection("trainees")
      .find({})
      .sort({ registrationDate: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        trainees,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trainee registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch trainee registrations" },
      { status: 500 }
    );
  }
}
