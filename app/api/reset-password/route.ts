import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";

// Zod validation schema for password reset
const resetPasswordSchema = z.object({
  emailOrPhone: z.string()
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
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = resetPasswordSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((err) => err.message)
        .join(', ');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { emailOrPhone, newPassword } = validationResult.data;

    // Connect to database
    const { db } = await connectToDatabase();

    // Check if it's an email or phone
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const normalizedEmail = isEmail ? emailOrPhone.trim().toLowerCase() : null;
    const normalizedPhone = !isEmail ? emailOrPhone.trim() : null;

    // Find user in trainees collection
    let user = null;
    let collection: string | null = null;

    if (normalizedEmail) {
      user = await db.collection("trainees").findOne({ email: normalizedEmail });
      if (user) {
        collection = "trainees";
      } else {
        user = await db.collection("experts").findOne({ email: normalizedEmail });
        if (user) {
          collection = "experts";
        }
      }
    } else if (normalizedPhone) {
      user = await db.collection("trainees").findOne({ phone: normalizedPhone });
      if (user) {
        collection = "trainees";
      } else {
        user = await db.collection("experts").findOne({ phone: normalizedPhone });
        if (user) {
          collection = "experts";
        }
      }
    }

    if (!user || !collection) {
      return NextResponse.json(
        {
          error: "User not found. Please check your email/phone number or register first.",
        },
        { status: 404 }
      );
    }

    // Update password
    const updateResult = await db.collection(collection).updateOne(
      { _id: user._id },
      {
        $set: {
          password: newPassword.trim(),
          lastUpdated: new Date(),
        },
      }
    );

    if (updateResult.modifiedCount === 1) {
      return NextResponse.json(
        {
          success: true,
          message: "Password reset successfully! You can now login with your new password.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to update password. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}

