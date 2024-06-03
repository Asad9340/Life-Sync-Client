import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Firebase/AuthProvider';

function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/users/${user?.email}`);
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update user data
      console.log('Updated user data:', userData);
      setEditable(false); // Disable editing after saving
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="justify-center items-center mt-10">
      <div className="flex  justify-end mb-4 w-full">
        {!editable ? (
          <button onClick={() => setEditable(true)} className="border py-2 px-4 rounded-md font-semibold bg-blue-600 text-white">Edit</button>
        ) : (
          <button onClick={handleSubmit} className="border py-2 px-4 rounded-md font-semibold bg-green-600 text-white">Save</button>
        )}
      </div>
      <form className="max-w-5xl mx-auto bg-[#F4F3F0] px-4 md:px-8 py-4 " onSubmit={handleSubmit}>
        <h6 className="text-blueGray-400 text-3xl mt-3 mb-6 font-bold text-center">User Profile</h6>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative w-full mb-3 flex justify-center">
              <img className="w-36" src={userData?.photoURL} alt="" />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Name" value={userData.name || ''} onChange={handleChange} readOnly={!editable} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" value={userData.email || ''} readOnly className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="district">District</label>
              <input type="text" name="district" id="district" placeholder="District Name" value={userData.district || ''} onChange={handleChange} readOnly={!editable} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="upazila">Upazila</label>
              <input type="text" name="upazila" id="upazila" placeholder="Upazila" value={userData.upazila || ''} onChange={handleChange} readOnly={!editable} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="bloodGroup">Blood Group</label>
              <input type="text" name="bloodGroup" id="bloodGroup" placeholder="Blood Group" value={userData.bloodGroup || ''} onChange={handleChange} readOnly={!editable} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
            </div>
          </div>
        </div>
        {editable && (
          <div className="w-full px-4">
            <div className="relative w-full mb-3">
              <input className="border w-full py-2 rounded-md font-semibold bg-green-700 active:bg-green-900 text-white" type="submit" value="Update Profile" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
