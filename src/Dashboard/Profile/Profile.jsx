import  { useState } from 'react';

const Profile = () => {
  // Sample user data fetched from API
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    district: 'Sample District',
    upazila: 'Sample Upazila',
    bloodGroup: 'A+',
    role: 'Donor',
    status: 'Active',
  };

  const districts = ['District 1', 'District 2', 'District 3']; // Sample districts
  const upazilas = ['Upazila 1', 'Upazila 2', 'Upazila 3']; // Sample upazilas
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']; // Blood groups

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...userData });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Save updated data to the database
    // Logic to save data goes here
    setIsEditing(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">User Information</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleEditClick}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.name}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-gray-600 font-semibold mb-1"
            >
              District
            </label>
            <select
              id="district"
              name="district"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.district}
              readOnly={!isEditing}
              onChange={handleChange}
            >
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="upazila"
              className="block text-gray-600 font-semibold mb-1"
            >
              Upazila
            </label>
            <select
              id="upazila"
              name="upazila"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.upazila}
              readOnly={!isEditing}
              onChange={handleChange}
            >
              {upazilas.map((upazila, index) => (
                <option key={index} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="bloodGroup"
              className="block text-gray-600 font-semibold mb-1"
            >
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.bloodGroup}
              readOnly={!isEditing}
              onChange={handleChange}
            >
              {bloodGroups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-600 font-semibold mb-1"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.role}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-600 font-semibold mb-1"
            >
              Status
            </label>
            <input
              type="text"
              id="status"
              className="w-full px-4 py-2 border rounded bg-gray-100"
              value={editedData.status}
              readOnly
            />
          </div>
        </div>
        {isEditing && (
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            onClick={handleSaveClick}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
