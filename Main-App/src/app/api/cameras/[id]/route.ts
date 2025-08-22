import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Define a type for the context object
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, context: RouteContext) { // Changed parameter to context
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = context.params; // Access params from context
    const body = await request.json();

    const updatedCamera = {
      name: body.name,
      location: body.location,
      ipAddress: body.ipAddress,
      status: body.status,
      streamUrl: body.streamUrl,
    };

    const result = await db
      .collection("cameras")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedCamera });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Camera not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Camera updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) { // Changed parameter to context
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = context.params; // Access params from context

    const result = await db
      .collection("cameras")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Camera not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Camera deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}