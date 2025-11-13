import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";

// Zod validation schema for server-side validation
const traineeSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\.\-']+$/, 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'),
  designation: z.string()
    .min(2, 'Designation must be at least 2 characters')
    .max(100, 'Designation must be less than 100 characters'),
  workingPost: z.string()
    .min(2, 'Working post must be at least 2 characters')
    .max(200, 'Working post must be less than 200 characters'),
  department: z.string()
    .min(1, 'Please select a department')
    .refine(val => ['Operating', 'Commercial', 'Engineering', 'S&T', 'Personnel', 'Accounts', 'Mechanical', 'Electrical', 'Others'].includes(val), {
      message: 'Please select a valid department'
    }),
  preparingFor: z.string()
    .min(1, 'Please select a post you are preparing for')
    .refine(val => ['AOM', 'ACM', 'ADEN', 'ADSTE', 'APO', 'AFM', 'ADMI', 'ADEE'].includes(val), {
      message: 'Please select a valid post'
    }),
  division: z.string()
    .min(1, 'Division is required')
    .max(100, 'Division must be less than 100 characters'),
  zone: z.string()
    .min(1, 'Zone is required')
    .max(100, 'Zone must be less than 100 characters'),
  phone: z.string()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  courseInterested: z.string()
    .min(1, 'Please select a course')
    .refine(val => ['AOM CRASH COURSE (2 MONTHS)', 'AOM SUPER CRASH COURSE (1 MONTH)', 'AOM ADVANCED OPERATIONS (20 DAYS)'].includes(val), {
      message: 'Please select a valid course'
    }),
  courseJoined: z.string()
    .min(1, 'Please select a course')
    .refine(val => ['AOM CRASH COURSE (2 MONTHS)', 'AOM SUPER CRASH COURSE (1 MONTH)', 'AOM ADVANCED OPERATIONS (20 DAYS)'].includes(val), {
      message: 'Please select a valid course'
    }),
  paymentDone: z.string()
    .min(1, 'Please select payment status')
    .refine(val => ['Yes', 'No'].includes(val), {
      message: 'Please select Yes or No'
    }),
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
    const validationResult = traineeSchema.safeParse(body);

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
      courseInterested,
      courseJoined,
      paymentDone,
      address,
      email,
      password,
    } = validationResult.data;

    // Connect to database
    const { db } = await connectToDatabase();

    // Check if email or phone number already exists
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    const existingTraineeByEmail = await db
      .collection("trainees")
      .findOne({ email: normalizedEmail });

    if (existingTraineeByEmail) {
      return NextResponse.json(
        { error: "A trainee with this email already exists. Please use a different email address." },
        { status: 409 }
      );
    }

    const existingTraineeByPhone = await db
      .collection("trainees")
      .findOne({ phone: normalizedPhone });

    if (existingTraineeByPhone) {
      return NextResponse.json(
        { error: "A trainee with this phone number already exists. Please use a different phone number." },
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
      phone: normalizedPhone,
      courseInterested: courseInterested ? courseInterested.trim() : "",
      courseJoined: courseJoined ? courseJoined.trim() : "",
      paymentDone: paymentDone ? paymentDone.trim() : "",
      address: address.trim(),
      email: normalizedEmail,
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
