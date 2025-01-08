import React from "react";
import { format } from "date-fns";
import { CheckCircle, Clock, Trash2, Hourglass } from "lucide-react";
import Layout from "./Layout";
import { useTask } from "../context/TaskContext";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

function TaskList() {
  const { tasks, loading } = useTask();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

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
    try {
      // Add API call to update the status
      await axios.put(`http://localhost:8080/api/task/${id}`, {
        status: newStatus,
      });
      toast.success(`Task status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Add API call to delete the task
      await axios.delete(`http://localhost:8080/api/task/${id}`);
      toast.success("Task deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <p className="mt-2 text-gray-600">{task.description}</p>
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Created At: {formatDate(task.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
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
                  <div className="flex items-center text-sm text-gray-500">
                    <Hourglass className="h-4 w-4 mr-2" />
                    <span>
                      Time Remaining: {calculateTimeLeft(task.dueDate, task.dueTime)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      Status: {task.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    handleStatusChange(
                      task._id,
                      task.status === "completed" ? "pending" : "completed"
                    )
                  }
                  className={`p-2 rounded-full transition-colors ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-600 hover:bg-green-200"
                      : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No tasks yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TaskList;
