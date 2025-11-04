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

    // Get all contact messages
    const messages = await db
      .collection("contactMessages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
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

    // Delete the contact message
    const result = await db.collection("contactMessages").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Contact message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return NextResponse.json(
      { error: "Failed to delete contact message" },
      { status: 500 }
    );
  }
}
