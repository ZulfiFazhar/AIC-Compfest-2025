import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const systemStatus = await db.collection("system_status").findOne({});
    return NextResponse.json(systemStatus);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();

    const updatedStatus = {
      ...body,
      lastUpdatedAt: new Date(),
    };

    const result = await db
      .collection("system_status")
      .updateOne({ $set: updatedStatus }, { upsert: true });

    return NextResponse.json({ message: "System status updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
