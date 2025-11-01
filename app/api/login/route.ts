import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";

// Zod validation schema for login
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email or phone number is required')
    .refine(
      (val) => {
        // Check if it's an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // Check if it's a 10-digit phone number
        const phoneRegex = /^[0-9]{10}$/
        return emailRegex.test(val) || phoneRegex.test(val)
      },
      {
        message: 'Please enter a valid email address or 10-digit phone number'
      }
    ),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((err) => err.message)
        .join(', ');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Check if admin credentials
    if (email.toLowerCase() === "adminaom@gmail.com" && password === "admin123aom") {
      return NextResponse.json(
        {
          success: true,
          isAdmin: true,
          message: "Admin login detected. Redirecting to admin panel.",
        },
        { status: 200 }
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

    // Check user status
    const userStatus = user.status || 'pending';
    
    if (userStatus === 'rejected') {
      return NextResponse.json(
        { 
          error: {
            title: "Login Rejected",
            message: "Your login was not successful due to one or more of the following reasons:",
            reasons: [
              "You have not joined the course.",
              "Course fee payment is pending.",
              "Your mobile number does not match our records. (The WhatsApp group mobile number and your registration mobile number must be the same.)"
            ],
            note: "Please use the same mobile number for both registration and all WhatsApp group communications after payment. Once you have updated your details or completed your payment, please contact the admin for activation.",
            contact: {
              academy: "Group B Officers Academy",
              email: "groupbofficersacademy@gmail.com",
              website: "www.groupbofficersacademy.com",
              whatsapp: ["9701758170", "9390223040"]
            }
          }
        },
        { status: 403 }
      );
    }

    if (userStatus === 'pending') {
      return NextResponse.json(
        { 
          error: "Your registration is pending approval. Please wait for admin approval." 
        },
        { status: 403 }
      );
    }

    // Only approved users can login
    if (userStatus !== 'approved') {
      return NextResponse.json(
        { 
          error: "Crash Course and Super Crash Course users only allowed." 
        },
        { status: 403 }
      );
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
