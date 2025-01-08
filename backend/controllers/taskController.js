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

const updateStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    // Validate inputs
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    if (!status || !["Pending", "Completed"].includes(status)) {
      return res.status(400).json({ error: "Valid status is required ('Pending' or 'Completed')" });
    }

    // Find the task
    const task = await Task.findById(taskId);

    // Validate that the task exists
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task's status
    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const showTask = async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });
  res.json(tasks);
};

const deleteTask = (req, res) => {
  res.send("Add Task ");
};

module.exports = { addTask, updateStatus, showTask, deleteTask };
