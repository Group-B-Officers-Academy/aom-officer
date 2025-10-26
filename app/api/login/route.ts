import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Check in trainees collection
    const trainee = await db.collection("trainees").findOne({
      $or: [{ email: email.trim().toLowerCase() }, { phone: email.trim() }],
    });

    // Check in experts collection
    const expert = await db.collection("experts").findOne({
      $or: [{ email: email.trim().toLowerCase() }, { phone: email.trim() }],
    });

    // Check if user exists
    const user = trainee || expert;

    if (!user) {
      return NextResponse.json(
        {
          error:
            "User not found. Please check your email/phone or register first.",
        },
        { status: 404 }
      );
    }

    // Check password (in real app, you'd hash passwords)
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Return user data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;

    return NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        user: {
          ...userData,
          userType: trainee ? "trainee" : "expert",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
