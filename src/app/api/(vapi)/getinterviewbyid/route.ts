import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Interviews from "@/models/Interviews";

// POST to fetch interview(s)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (id) {
      const interview = await Interviews.findById(id);
      if (!interview) {
        return NextResponse.json({ success: false, message: "Interview not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: interview });
    }

    const interviews = await Interviews.find();
    return NextResponse.json({ success: true, data: interviews });

  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
