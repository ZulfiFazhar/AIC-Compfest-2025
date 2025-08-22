import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/cameras
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const cameras = await db.collection("cameras").find({}).toArray();
    return NextResponse.json(cameras);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST /api/cameras
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();

    const newCamera = {
      name: body.name,
      location: body.location,
      ipAddress: body.ipAddress,
      status: body.status || "online",
      streamUrl: body.streamUrl,
      addedAt: new Date(),
    };

    const result = await db.collection("cameras").insertOne(newCamera);
    const insertedCamera = { ...newCamera, _id: result.insertedId };
    return NextResponse.json(insertedCamera, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
