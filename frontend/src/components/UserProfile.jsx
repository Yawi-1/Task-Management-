import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import Layout from "./Layout";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");

  const loadProfile = () => {};

  const updateProfile = () => {};

  const handleSignOut = () => {};

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  onClick={updateProfile}
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setUsername(profile?.username || "");
                  }}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Yawi</h2>
                  <p className="text-sm text-gray-500">Task Manager User</p>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default UserProfile;
