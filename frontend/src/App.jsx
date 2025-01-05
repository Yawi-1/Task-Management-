import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TaskForm from './components/TaskForm';
import UserProfile from './components/UserProfile';
import TaskList from './components/TaskList';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        {user ? (
          // Routes for authenticated users
          <>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/"  />} />
          </>
        ) : (
          // Route for unauthenticated users
          <>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="*" element={<Navigate to="/auth"  />} />
          </>
        )}
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
