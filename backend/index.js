const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const User = require("./models/userSchema");
const authenticate = require("./middlewares/protectedRoute");
const authRoutes = require("./routes/authRouter");
const taskRoutes = require("./routes/taskRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

// Static files to serve images
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profilePic = `${req.file.filename}`; 
    await user.save();

    res.status(201).json({
      message: "File uploaded successfully",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed" });
  }
});
app.get('/profile',authenticate,async(req,res)=>{
  try {
    const profile = await User.findById(req.user._id).select("profilePic");
    res.status(200).json(profile);
  } catch (error) {
    res.json({message:"Error to get profile"})
  }
})
// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
