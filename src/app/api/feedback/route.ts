import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Feedback, { IFeedback } from "@/models/Feedback";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const {
      areasForImprovement,
      categoryScores,
      finalAssessment,
      interviewId,
      strengths,
      totalScore,
      userId,
    } = await request.json();

    const newFeedback : IFeedback = await Feedback.create({
      areasForImprovement,
      categoryScores,
      finalAssessment,
      interviewId,
      strengths,
      totalScore,
      userId
    });

    return NextResponse.json({ success: true, data: newFeedback });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}


export async function GET(request: Request) {

  try {

    await connectToDatabase();

    const interviews = await Feedback.find();

    return NextResponse.json({ success: true, data: interviews });

  } catch (error) {


    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }

}



