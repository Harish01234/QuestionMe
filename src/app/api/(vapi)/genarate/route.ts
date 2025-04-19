import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { connectToDatabase } from "@/lib/db";
import Interviews from "@/models/Interviews";

const model = google("gemini-2.0-flash-001");


export async function POST(request: Request) {

    try {
        const { type, role, level, techstack, amount,userid } = await request.json();

        if (!type || !role || !level || !techstack || !amount) {
            return NextResponse.json(                   
                { success: false, error: "Missing required fields" },
                { status: 400 } 
            );
        }

        await connectToDatabase();

        const { text: questions } = await generateText({
            model,
            prompt: `Prepare questions for a job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      The tech stack used in the job is: ${techstack}.
      The focus between behavioural and technical questions should lean towards: ${type}.
      The amount of questions required is: ${amount}.
      Please return only the questions, without any additional text.
      The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
      Return the questions formatted like this:
      ["Question 1", "Question 2", "Question 3"]
      Thank you! <3`,
          });

        //save values to the database
    const interview = {
        role: role,
        type: type,
        level: level,
        techstack: techstack.split(","),
        questions: JSON.parse(questions),
        userId: userid,
        finalized: true,
        createdAt: new Date().toISOString(),
      };

      const savedInterview = await Interviews.create(interview);
      console.log("Interview saved:", savedInterview);

        return NextResponse.json(
            { success: true, data: savedInterview },
            { status: 200 }
        );





    } catch (error) {

        console.error("Error generating questions:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }

}


export async function GET() {

    try {
        connectToDatabase();
        const interviews = await Interviews.find();
        return NextResponse.json({ success: true, data: interviews });
    } catch (error) {
        console.error("Error fetching interviews:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
        
    }

    return NextResponse.json({ success: true, message: "API is up and running!" });
  }
