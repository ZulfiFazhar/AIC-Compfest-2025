import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection('users').find({}).toArray();
    return NextResponse.json(users);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
