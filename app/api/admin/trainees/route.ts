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

// PATCH method to update trainee registration status
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

    // Update the trainee registration status
    const result = await db.collection("trainees").updateOne(
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
        { error: "Trainee registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Trainee registration ${status} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating trainee registration:", error);
    return NextResponse.json(
      { error: "Failed to update trainee registration" },
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

    // Delete the trainee registration
    const result = await db.collection("trainees").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Trainee registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Trainee registration deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting trainee registration:", error);
    return NextResponse.json(
      { error: "Failed to delete trainee registration" },
      { status: 500 }
    );
  }
}
