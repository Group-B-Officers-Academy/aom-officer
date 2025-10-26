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

    // Get all expert registrations
    const experts = await db
      .collection("experts")
      .find({})
      .sort({ registrationDate: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        experts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching expert registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch expert registrations" },
      { status: 500 }
    );
  }
}
