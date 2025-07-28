import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await auth.api.getSession({
      headers: request.headers,
    });

    if (!result) {
      return NextResponse.json({ user: null, session: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        user: result.user || null,
        session: result.session || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { user: null, session: null, error: "Failed to get session" },
      { status: 500 }
    );
  }
}
