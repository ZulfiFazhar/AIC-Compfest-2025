/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const type = searchParams.get("type");
    const severity = searchParams.get("severity");
    const searchTerm = searchParams.get("searchTerm"); // New: searchTerm

    const query: any = {};
    if (type) {
      query.type = type;
    }
    if (severity) {
      query.severity = severity;
    }

    const aggregationPipeline: any[] = [];

    // Stage 1: Initial filtering based on type and severity
    if (Object.keys(query).length > 0) {
      aggregationPipeline.push({ $match: query });
    }

    // Stage 2: Lookup camera details if searchTerm is present or if we need camera info for display
    // This is crucial for searching by camera name/location
    aggregationPipeline.push({
      $lookup: {
        from: "cameras",
        localField: "cameraId",
        foreignField: "_id",
        as: "cameraInfo",
      },
    });

    // Stage 3: Unwind the cameraInfo array (since $lookup returns an array)
    aggregationPipeline.push({
      $unwind: {
        path: "$cameraInfo",
        preserveNullAndEmptyArrays: true, // Keep events even if cameraInfo is not found
      },
    });

    // Stage 4: Apply searchTerm filtering
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i"); // Case-insensitive search
      aggregationPipeline.push({
        $match: {
          $or: [
            { type: { $regex: searchRegex } },
            { "cameraInfo.name": { $regex: searchRegex } },
            { "cameraInfo.location": { $regex: searchRegex } },
            // You can add other fields to search here, e.g., details.description
          ],
        },
      });
    }

    // Stage 5: Sort by timestamp
    aggregationPipeline.push({ $sort: { timestamp: -1 } });

    // Stage 6: Pagination
    aggregationPipeline.push({ $skip: skip });
    aggregationPipeline.push({ $limit: limit });

    // Stage 7: Project to shape the output document (optional, but good practice)
    aggregationPipeline.push({
      $project: {
        _id: 1,
        timestamp: 1,
        type: 1,
        severity: 1,
        cameraId: 1,
        userId: 1,
        details: 1,
        status: 1,
        cameraName: "$cameraInfo.name",
        cameraLocation: "$cameraInfo.location",
      },
    });

    const events = await db
      .collection("events")
      .aggregate(aggregationPipeline)
      .toArray();

    return NextResponse.json(events);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
