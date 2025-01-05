import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from './Layout';

const tasks = [
  {
    id: 1,
    title: 'Complete React Project',
    description: 'Finish the task management app using MERN stack.',
    due_date: '2025-01-10T15:00:00Z',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Write Blog Post',
    description: 'Draft and publish a blog post about Redux state management.',
    due_date: '2025-01-12T18:00:00Z',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Prepare Presentation',
    description: 'Create slides for the upcoming team meeting.',
    due_date: '2025-01-08T09:00:00Z',
    status: 'pending',
  },
];

function TaskList() {
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
          key={task.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              <p className="mt-1 text-gray-600">{task.description}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  Due: {format(new Date(task.due_date), 'PPp')}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                className={`p-2 rounded-full transition-colors ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
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
          <p className="text-gray-500">No tasks yet. Create one to get started!</p>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default TaskList;
