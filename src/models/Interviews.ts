import mongoose, { Schema, model, models } from "mongoose";

export interface IInterview {
    questions: string[];
    level: string;
    role: string;
    techstack: string[];
    type: string;
    _id?: mongoose.Types.ObjectId | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

const interviewSchema = new Schema<IInterview>(
    {
        questions: { type: [String], required: true },
        level: { type: String, required: true },
        role: { type: String, required: true },
        techstack: { type: [String], required: true },
        type: { type: String, required: true },
    },
    { timestamps: true }
);

const Interviews = models?.Interviews || model<IInterview>("Interviews", interviewSchema);

export default Interviews;