import mongoose, { Document, Schema } from "mongoose";

export enum ApplicationStatus {
  PENDING = "pending",
  IN_REVIEW = "in_review",
  INTERVIEW = "interview",
  REJECTED = "rejected",
  ACCEPTED = "accepted",
}

export interface IApplication extends Document {
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: ApplicationStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const ApplicationSchema = new Schema<IApplication>(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },
    notes: { type: String },
  },
  { timestamps: true }
);

// Model
export default mongoose.model<IApplication>("Application", ApplicationSchema);
