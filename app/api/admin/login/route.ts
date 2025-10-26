import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { username, password } = requestBody;

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Connect to database with proper error handling
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { db } = await connectToDatabase();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      // Continue without database for now, but log the error
      // In production, you might want to fail here or use a fallback
    }

    // Check admin credentials (in production, use environment variables)
    const adminCredentials = {
      username: process.env.ADMIN_USERNAME || "adminaom",
      password: process.env.ADMIN_PASSWORD || "admin123aom",
    };

    // Log for debugging (remove in production)
    console.log("Admin login attempt:", { 
      username: username, 
      expectedUsername: adminCredentials.username,
      hasPassword: !!password,
      hasExpectedPassword: !!adminCredentials.password
    });

    if (
      username !== adminCredentials.username ||
      password !== adminCredentials.password
    ) {
      console.log("Invalid credentials provided");
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Admin login successful!",
        admin: {
          username: adminCredentials.username,
          role: "admin",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error during admin login:", error);
    return NextResponse.json(
      { error: "Admin login failed. Please try again." },
      { status: 500 }
    );
  }
}
