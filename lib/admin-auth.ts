import { NextRequest, NextResponse } from "next/server";

export function adminAuthMiddleware(request: NextRequest) {
  // This is a simple middleware for demo purposes
  // In production, use proper JWT tokens or session management

  const adminSession = request.headers.get("admin-session");

  if (!adminSession) {
    return NextResponse.json(
      { error: "Admin authentication required" },
      { status: 401 }
    );
  }

  try {
    const session = JSON.parse(adminSession);

    if (!session.username || session.role !== "admin") {
      return NextResponse.json(
        { error: "Invalid admin session" },
        { status: 401 }
      );
    }

    return null; // Authentication successful
  } catch {
    return NextResponse.json(
      { error: "Invalid session format" },
      { status: 401 }
    );
  }
}

// Helper function to check admin authentication in API routes
export function checkAdminAuth(request: NextRequest) {
  return adminAuthMiddleware(request);
}
