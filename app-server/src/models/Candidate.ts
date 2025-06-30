import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICandidate extends Document {
  userId: Types.ObjectId;
  phone?: string;
  location?: string;
  experienceLevel?: string;
  skills?: string[];
  languages?: string[];
  education?: string;
  cvUrl?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const CandidateSchema = new Schema<ICandidate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: { type: String },
    location: { type: String },
    experienceLevel: { type: String },
    skills: [{ type: String }],
    languages: [{ type: String }],
    education: { type: String },
    cvUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Model
export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
