import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define a type for the context object
interface RouteContext {
  params: {
    id: string;
  };
}

// PUT /api/events/[id]
export async function PUT(request: Request, context: RouteContext) { // Changed parameter to context
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = context.params; // Access params from context
    const body = await request.json();

    // Construct the update object based on what's sent in the body
    const updateDoc: { [key: string]: any } = {};
    if (body.status) {
      updateDoc.status = body.status;
    }
    // Add other fields you might want to update for an event
    // e.g., if you want to add a 'reviewedBy' field
    if (body.reviewedBy) {
      updateDoc.reviewedBy = body.reviewedBy;
    }

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event updated successfully' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// DELETE /api/events/[id]
export async function DELETE(request: Request, context: RouteContext) { // Changed parameter to context
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = context.params; // Access params from context

    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}