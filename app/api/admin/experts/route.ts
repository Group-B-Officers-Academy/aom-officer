import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { checkAdminAuth } from "@/lib/admin-auth";
import { ObjectId } from "mongodb";

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

// PATCH method to update expert registration status
export async function PATCH(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = checkAdminAuth(request);
    if (authError) return authError;

    const { id, status } = await request.json();

    // Validate status
    if (!id || !status || !['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: "Invalid request. ID and status (approved/rejected/pending) are required" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Update the expert registration status
    const result = await db.collection("experts").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status,
          lastUpdated: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Expert registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Expert registration ${status} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating expert registration:", error);
    return NextResponse.json(
      { error: "Failed to update expert registration" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = checkAdminAuth(request);
    if (authError) return authError;

    const { id } = await request.json();

    // Validate id
    if (!id) {
      return NextResponse.json(
        { error: "Invalid request. ID is required" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Delete the expert registration
    const result = await db.collection("experts").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Expert registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Expert registration deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting expert registration:", error);
    return NextResponse.json(
      { error: "Failed to delete expert registration" },
      { status: 500 }
    );
  }
}
