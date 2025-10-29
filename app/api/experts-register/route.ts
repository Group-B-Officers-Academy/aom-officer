import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";

// Zod validation schema for server-side validation
const expertSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\.\-']+$/, 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'),
  designation: z.string()
    .min(2, 'Designation must be at least 2 characters')
    .max(100, 'Designation must be less than 100 characters'),
  workingPost: z.string()
    .max(200, 'Working post must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  department: z.string()
    .min(1, 'Please select a department')
    .refine(val => ['Operating', 'Commercial', 'Engineering', 'S&T', 'Personnel', 'Accounts', 'Mechanical', 'Electrical', 'Others'].includes(val), {
      message: 'Please select a valid department'
    }),
  preparingFor: z.string()
    .max(50, 'Post must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  division: z.string()
    .max(100, 'Division must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  zone: z.string()
    .max(100, 'Zone must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = expertSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMessage}` },
        { status: 400 }
      );
    }

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
    } = validationResult.data;

    // Connect to database
    const { db } = await connectToDatabase();

    // Check if email or phone number already exists
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    const existingExpertByEmail = await db
      .collection("experts")
      .findOne({ email: normalizedEmail });

    if (existingExpertByEmail) {
      return NextResponse.json(
        { error: "An expert with this email already exists. Please use a different email address." },
        { status: 409 }
      );
    }

    const existingExpertByPhone = await db
      .collection("experts")
      .findOne({ phone: normalizedPhone });

    if (existingExpertByPhone) {
      return NextResponse.json(
        { error: "An expert with this phone number already exists. Please use a different phone number." },
        { status: 409 }
      );
    }

    // Create expert document
    const expertData = {
      name: name.trim(),
      designation: designation.trim(),
      workingPost: workingPost ? workingPost.trim() : "",
      department: department.trim(),
      preparingFor: preparingFor ? preparingFor.trim() : "",
      division: division ? division.trim() : "",
      zone: zone ? zone.trim() : "",
      phone: normalizedPhone,
      address: address.trim(),
      email: normalizedEmail,
      password: password.trim(),
      registrationDate: new Date(),
      status: "pending", // pending, approved, rejected
      lastUpdated: new Date(),
    };

    // Insert into database
    const result = await db.collection("experts").insertOne(expertData);

    if (result.insertedId) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Expert registration completed successfully! We will review your application and get back to you soon.",
          id: result.insertedId,
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to save expert registration");
    }
  } catch (error) {
    console.error("Error saving expert registration:", error);
    return NextResponse.json(
      { error: "Failed to complete registration. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: GET method to retrieve expert registrations (for admin purposes)
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const experts = await db
      .collection("experts")
      .find({})
      .sort({ registrationDate: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ experts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching expert registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch expert registrations" },
      { status: 500 }
    );
  }
}
