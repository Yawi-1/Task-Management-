const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/userSchema");
const authRoutes = require('./routes/authRouter')

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/api/auth',authRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await new User({ name, email, password });
  await user.save();
  res.status(200).json({ user });
});

// Connect to MongoDB before starting the server
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process on failure
  });
