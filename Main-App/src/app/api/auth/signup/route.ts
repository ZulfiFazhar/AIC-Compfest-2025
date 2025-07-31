import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      headers: request.headers,
    });

    if (!result) {
      return NextResponse.json({ error: "Signup failed" }, { status: 400 });
    }

    // Create response with proper headers for cookies
    const response = NextResponse.json(
      { message: "User created successfully", user: result.user },
      { status: 201 }
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
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
