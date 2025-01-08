import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const TaskContext = createContext();

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskContextProvider = (props) => {
  const endpoint = "http://localhost:8080/api/task";
  const { user } = useAuth();
  const token  = user?.token;
  // Add task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${endpoint}/add`,
        { title, description, dueDate, dueTime },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      showTasks();
      // Clear inputs after successful submission
      setTitle("");
      setDescription("");
      setDueDate("");
      setDueTime("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired");
      } else {
        console.error("Error at adding task....", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get tasks
  const [tasks, setTasks] = useState([]);
  const showTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${endpoint}/show`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      setTasks(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired");
      } else {
        console.error("Error at adding task....", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        title,
        description,
        dueDate,
        dueTime,
        setTitle,
        setDescription,
        setDueDate,
        setDueTime,
        loading,
        addTask,
        tasks,
        setTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
