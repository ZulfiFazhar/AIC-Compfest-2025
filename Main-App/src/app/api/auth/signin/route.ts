import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: request.headers,
    });

    if (!result) {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }

    // Create response with proper headers for cookies
    const response = NextResponse.json(
      { message: "Login successful", user: result.user },
      { status: 200 }
    );

    // Copy session cookies from auth result to response
    if (result) {
      for (const [key, value] of Object.entries(result)) {
        if (key.toLowerCase() === "set-cookie") {
          response.headers.set(key, value as string);
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
