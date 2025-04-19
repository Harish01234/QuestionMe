'use server';
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { connectToDatabase } from "./db";
import Feedback, { IFeedback } from "@/models/Feedback"; // Ensure the model is imported correctly
import { IInterview } from "@/models/Interviews"; // Ensure the IInterview model is imported correctly
import { feedbackSchema } from "@/constants/feedbackschema";

interface TranscriptEntry {
  role: string;  // Role can be "Candidate" or "Interviewer"
  content: string; // Content is the text for that part of the transcript
}

type Transcript = TranscriptEntry[]; // An array of TranscriptEntry objects

const createfeedback = async (transcript: Transcript, interview: IInterview, userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Format the transcript
    const formattedTranscript = transcript
      .map((sentence) => `- ${sentence.role}: ${sentence.content}\n`)
      .join("");

    // Prepare the prompt for the AI model
    const prompt = `
      You are an AI interviewer analyzing a mock interview for the role of **${interview.role}** at **${interview.level}** level.
      The interview type is **${interview.type}** and the required tech stack includes: ${interview.techstack.join(", ")}.
      
      Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient. If there are mistakes or areas for improvement, point them out.

      Transcript:
      ${formattedTranscript}

      Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
      - **Communication Skills**: Clarity, articulation, structured responses.
      - **Technical Knowledge**: Understanding of key concepts for the role.
      - **Problem-Solving**: Ability to analyze problems and propose solutions.
      - **Cultural & Role Fit**: Alignment with company values and job role.
      - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
    `;

    // Generate the feedback using the AI model
    const { object } = await generateObject({
        model: google("gemini-2.0-flash-001", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,
        prompt,
        system:
          "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.",
      });

    // Save the feedback to the database
    const feedback = new Feedback({
      interviewId: interview._id,
      userId: userId,
      areasForImprovement: object.areasForImprovement,
      categoryScores: object.categoryScores,
      finalAssessment: object.finalAssessment,
      strengths: object.strengths,
      totalScore: object.totalScore,


    });
    await feedback.save();

    return JSON.stringify(feedback);


    
   

  } catch (error) {
    console.log("Error in the feedback generation:", error);
    throw new Error("Feedback generation failed.");
  }
};

export default createfeedback;
