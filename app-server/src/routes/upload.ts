import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import CandidateModel from "../models/Candidate";

const router = express.Router();

// Make sure the uploads folder is available
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max de 5MB
  fileFilter: (_, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
    }
  },
});

router.post("/upload", upload.single("cv"), async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const BEARER_PREFIX = "Bearer ";
    const token = authHeader.startsWith(BEARER_PREFIX)
      ? authHeader.substring(BEARER_PREFIX.length).trim()
      : null;

    if (!token) return res.status(401).json({ error: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    const userId = decoded.id;

    const candidate = await CandidateModel.findOne({ userId });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate profile not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    candidate.cvUrl = fileUrl;
    await candidate.save();

    return res.status(200).json({ message: "CV uploaded", cvUrl: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
