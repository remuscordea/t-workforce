import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

// Interfață TypeScript (opțional, dar utilă)
interface IUser {
  name: string;
  email: string;
  password: string;
  role: "candidate" | "client" | "recruiter";
}

// Schema Mongoose
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["candidate", "client", "recruiter"],
    default: "candidate",
  },
});

const User = mongoose.model<IUser>("User", userSchema);

async function initDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Șterge datele existente
    await User.deleteMany();

    // Creează parole hash-uite
    const password1 = await bcrypt.hash("parola123", 10);
    const password2 = await bcrypt.hash("client2024", 10);

    // Inserare useri demo
    await User.insertMany([
      {
        name: "Ana Popescu",
        email: "ana@example.com",
        password: password1,
        role: "candidate",
      },
      {
        name: "Dan Client",
        email: "dan@firma.com",
        password: password2,
        role: "client",
      },
    ]);

    console.log("✅ Date demo cu parole hash-uite inserate cu succes!");
  } catch (error) {
    console.error("Eroare la populare DB:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

initDB();
