import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Feedback from "@/models/Feedback";

export async function POST(request: Request) {
  try {
    const { id: userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing userId" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Get all feedbacks for the user, sorted by createdAt (most recent first)
    const feedbacks = await Feedback.find({ userId }).sort({ createdAt: -1 });

    if (!feedbacks || feedbacks.length === 0) {
      return NextResponse.json(
        { success: false, error: "No feedbacks found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: feedbacks });

  } catch (error) {
    console.error("Error fetching feedbacks for user:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
