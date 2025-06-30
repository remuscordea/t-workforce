import mongoose, { Document, Schema } from "mongoose";

export interface IBookmark extends Document {
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const BookmarkSchema = new Schema<IBookmark>(
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
  },
  { timestamps: true }
);

// Model
export default mongoose.model<IBookmark>("Bookmark", BookmarkSchema);
