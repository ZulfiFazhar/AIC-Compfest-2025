/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT /api/events/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = await params;
    const body = await request.json();

    const updateDoc: { [key: string]: any } = {};
    if (body.status) {
      updateDoc.status = body.status;
    }
    if (body.reviewedBy) {
      updateDoc.reviewedBy = body.reviewedBy;
    }

    const result = await db
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = await params;

    const result = await db
      .collection("events")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
