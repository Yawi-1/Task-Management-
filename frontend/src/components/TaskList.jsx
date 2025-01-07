import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CheckCircle, Clock, Trash2, Hourglass } from "lucide-react";
import toast from "react-hot-toast";
import Layout from "./Layout";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  async function showTasks() {
    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;

      const response = await axios.get("http://localhost:8080/api/task/show", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    showTasks();
  }, []);

  // Function to calculate time left
  const calculateTimeLeft = (dueDate, dueTime) => {
    if (!dueDate || !dueTime) return "Time not available";

    const dueDateTime = new Date(
      new Date(dueDate).toISOString().split("T")[0] + "T" + dueTime
    ).getTime();
    const now = Date.now();
    const timeLeft = dueDateTime - now;

    if (timeLeft <= 0) {
      return "Task overdue!";
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m`;
  };

  const handleStatusChange = async (id, newStatus) => {
    toast.success(`Task ${id} status updated to ${newStatus}`);
  };

  const handleDelete = async (id) => {
    toast.error(`Task ${id} deleted.`);
  };

  return (
    <Layout>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>
                <p className="mt-1 text-gray-600">{task.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {task.dueDate && task.dueTime
                      ? `Due: ${format(
                          new Date(
                            new Date(task.dueDate)
                              .toISOString()
                              .split("T")[0] +
                              "T" +
                              task.dueTime
                          ),
                          "PPpp"
                        )}`
                      : "Due date and time not available"}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Hourglass className="h-4 w-4 mr-1" />
                  <span>{calculateTimeLeft(task.dueDate, task.dueTime)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleStatusChange(
                      task._id,
                      task.status === "completed" ? "pending" : "completed"
                    )
                  }
                  className={`p-2 rounded-full transition-colors ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 transition-colors hover:bg-red-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              No tasks yet. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TaskList;
