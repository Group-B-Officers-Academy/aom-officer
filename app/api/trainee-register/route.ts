import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      designation,
      workingPost,
      department,
      preparingFor,
      division,
      zone,
      phone,
      address,
      email,
      password,
    } = await request.json();

    // Basic validation
    if (
      !name ||
      !designation ||
      !department ||
      !phone ||
      !address ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          error:
            "Name, designation, department, phone, address, email, and password are required",
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Check if email already exists
    const existingTrainee = await db
      .collection("trainees")
      .findOne({ email: email.trim().toLowerCase() });

    if (existingTrainee) {
      return NextResponse.json(
        { error: "A trainee with this email already exists" },
        { status: 409 }
      );
    }

    // Create trainee document
    const traineeData = {
      name: name.trim(),
      designation: designation.trim(),
      workingPost: workingPost ? workingPost.trim() : "",
      department: department.trim(),
      preparingFor: preparingFor ? preparingFor.trim() : "",
      division: division ? division.trim() : "",
      zone: zone ? zone.trim() : "",
      phone: phone.trim(),
      address: address.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      registrationDate: new Date(),
      status: "pending", // pending, approved, rejected
      lastUpdated: new Date(),
    };

    // Insert into database
    const result = await db.collection("trainees").insertOne(traineeData);

    if (result.insertedId) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Registration completed successfully! We will review your application and get back to you soon.",
          id: result.insertedId,
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to save trainee registration");
    }
  } catch (error) {
    console.error("Error saving trainee registration:", error);
    return NextResponse.json(
      { error: "Failed to complete registration. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: GET method to retrieve trainee registrations (for admin purposes)
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const trainees = await db
      .collection("trainees")
      .find({})
      .sort({ registrationDate: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ trainees }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trainee registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch trainee registrations" },
      { status: 500 }
    );
  }
}
