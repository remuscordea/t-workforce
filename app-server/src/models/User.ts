import mongoose, { Document, Schema } from "mongoose";

export enum UserRoles {
  CANDIDATE = "candidate",
  CLIENT = "client",
  RECRUITER = "recruiter",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRoles.CANDIDATE, UserRoles.CLIENT, UserRoles.RECRUITER],
      default: UserRoles.CANDIDATE,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
export default mongoose.model<IUser>("User", UserSchema);
