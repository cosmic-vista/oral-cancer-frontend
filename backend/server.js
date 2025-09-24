import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";

const app = express();

// Allow your forwarded frontend to access backend
const frontendUrl = "https://3kvgxffc-5174.inc1.devtunnels.ms";
app.use(cors({ origin: frontendUrl }));
app.use(express.json());

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // save in 'uploads' folder
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // unique filename
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  console.log("File saved at:", req.file.path); // logs local path
  res.json({ message: "File uploaded successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
