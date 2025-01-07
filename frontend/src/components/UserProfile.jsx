import React, { useEffect, useState } from "react";
import { User, Upload } from "lucide-react";
import Layout from "./Layout";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

function UserProfile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = useAuth();

  const loadProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8080/profile',{
            headers: {
              'Authorization': `Bearer ${user.token}`
              }
          });
          const profilePicUrl = `http://localhost:8080/uploads/${response.data.profilePic}`
          setProfilePicture(profilePicUrl)
        } catch (error) {
          
        }
  };
  useEffect(()=>{
    loadProfile();
  },[])

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(data.message);
      setProfilePicture(data.profilePic); // Update the profile picture state
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture");
    }
  };

  useEffect(() => {
    loadProfile();
  }, [profilePicture]);

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full">
                <User className="h-6 w-6 text-gray-600" />
              </div>
            )}
            <label
              htmlFor="upload-profile-picture"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700"
            >
              <Upload className="h-4 w-4" />
            </label>
            <input
              id="upload-profile-picture"
              type="file"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold uppercase">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;
