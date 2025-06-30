import mongoose, { Document, Schema } from "mongoose";

enum JobType {
  FULL_TIME = "fullTime",
  PART_TIME = "partTime",
  REMOTE = "remote",
  HYBRID = "hybrid",
}

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  type: JobType;
  isActive: boolean;
  companyId: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId; // utilizatorul care a postat (admin/recruiter)
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: [
        JobType.FULL_TIME,
        JobType.PART_TIME,
        JobType.REMOTE,
        JobType.HYBRID,
      ],
      default: JobType.FULL_TIME,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Model
export default mongoose.model<IJob>("Job", JobSchema);
