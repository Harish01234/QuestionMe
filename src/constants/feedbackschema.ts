import { z } from "zod";

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.object({
    communication: z.number(),
    technical: z.number(),
    problemSolving: z.number(),
    culturalFit: z.number(),
    confidence: z.number(),
  }),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});