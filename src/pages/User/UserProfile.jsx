import React, { useState, useEffect } from 'react';
import { editProfileApi, changePasswordApi, updateProfileApi, updatePasswordApi } from '../../Apis/apis'; // Assuming editProfileApi and changePasswordApi are imported correctly
import { toast } from 'react-toastify';
import avatar from '../../assets/images.jpg';

const UserProfile = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const user = JSON.parse(userDataFromStorage);
      setUser(user);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, []);

  const openEditProfileModal = () => {
    setShowEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  const openChangePasswordModal = () => {
    setShowChangePasswordModal(true);
    setCurrentPassword('');
    setNewPassword('');

  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };


  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfileData = {
        name: name,
        email: email,
      };
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await updateProfileApi(user.id, updatedProfileData);
      const data = response.data; // Axios response data

      console.log('Profile updated successfully:', data);
      
      setUser({ ...user, name, email });
      localStorage.setItem("user", JSON.stringify({ ...user, name, email }));
      toast.success('Profile updated successfully!');
      
      closeEditProfileModal();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile!');
    }
};

const handleChangePasswordSubmit = async (e) => {
  e.preventDefault();
  if (newPassword.length < 6) {
    toast.error('New password must be at least 6 characters long');
    return;
  }
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await updatePasswordApi(user.id, {
      currentPassword,
      newPassword,
    });
    const data = await response.data; // axios returns response data directly
    toast.info(data.message);
    closeChangePasswordModal();
  } catch (error) {
    console.error('Error changing password:', error);
    toast.error('Failed to change password!');
  }
};

  return (
    <div className="">
    <div className="overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">User Profile</h2>
        <p className="text-gray-600">Manage your account settings and information</p>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={avatar} className="w-24 h-24 rounded-full mr-4" alt="Avatar" />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <p className="text-gray-900">{name}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <p className="text-gray-900">{email}</p>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={openEditProfileModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit Profile
          </button>
          <button
            onClick={openChangePasswordModal}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
    {showEditProfileModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-4">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleEditProfileSubmit}>
            <div className="mb-4">
              <label htmlFor="editName" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="editName"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editEmail" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="editEmail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              onClick={closeEditProfileModal}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      )}

      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Change Password
              </button>
              <button
                onClick={closeChangePasswordModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
