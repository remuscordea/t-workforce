import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  logoUrl?: string;
  user: mongoose.Types.ObjectId; // legat de userul creat
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    industry: { type: String },
    logoUrl: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Model
export default mongoose.model<ICompany>("Company", CompanySchema);
