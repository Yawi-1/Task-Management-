import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskContextProvider } from "./context/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TaskContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskContextProvider>
    </AuthProvider>
  </StrictMode>
);
