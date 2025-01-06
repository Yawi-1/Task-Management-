const Task = require("../models/taskSchema");

const addTask = async (req, res) => {
  try {
    const { title, description, dueDate, dueTime } = req.body;
    const userId = req.user?._id; // Use optional chaining
    if (!title || !description || !dueDate || !dueTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      dueTime,
      user: userId,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = (req, res) => {
  res.send("Add Task ");
};

const showTask = (req, res) => {
  res.send("Add Task ");
};

const deleteTask = (req, res) => {
  res.send("Add Task ");
};

module.exports = { addTask, updateTask, showTask, deleteTask };
