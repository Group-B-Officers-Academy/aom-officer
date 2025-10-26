import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
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

    // Connect to database
    const { db } = await connectToDatabase();

    // Create contact message document
    const contactMessage = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      message: message.trim(),
      createdAt: new Date(),
      status: "new", // new, read, replied
    };

    // Insert into database
    const result = await db
      .collection("contactMessages")
      .insertOne(contactMessage);

    if (result.insertedId) {
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          id: result.insertedId,
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to save message");
    }
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: GET method to retrieve messages (for admin purposes)
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const messages = await db
      .collection("contactMessages")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
