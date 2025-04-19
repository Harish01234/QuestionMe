import mongoose, { Schema, model, models } from "mongoose";

export interface IFeedback {
    areasForImprovement: string[];
    categoryScores: { [key: string]: number };
    finalAssessment: string;
    interviewId: mongoose.Types.ObjectId;
    strengths: string[];
    totalScore: number;
    userId: mongoose.Types.ObjectId;
    
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}   

export  const  feedbackSchema = new Schema<IFeedback>(
    {
        areasForImprovement: { type: [String], required: true },
        categoryScores: { type: Object, required: true },
        finalAssessment: { type: String, required: true },
        interviewId: { type: Schema.Types.ObjectId, required: true },
        strengths: { type: [String], required: true },      
        totalScore: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, required: true },   
             
    },
    { timestamps: true }    
);

const Feedback = models?.Feedback || model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;