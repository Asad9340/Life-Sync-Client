import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Firebase/AuthProvider';

function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [editable, setEditable] = useState(false);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `https://life-sync-server.vercel.app/users/${user?.email}`
        );
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

  useEffect(() => {
    (async () => {
      const res = await fetch('/districts.json');
      const data = await res.json();
      setDistrict(data[2].data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch('/upazilas.json');
      const data = await res.json();
      setUpazila(data[2].data);
    })();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const UpdatedUserData = {
      name,
      email,
      bloodGroup,
      district,
      upazila,
    };
    console.log(UpdatedUserData);
    try {
      const response = await axios.patch(
        `https://life-sync-server.vercel.app/users/${user?.email}`,
        UpdatedUserData
      );
      console.log('Updated user data:', response.data);
      setEditable(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="justify-center items-center mt-10">
      <div className="flex  justify-end mb-4 w-full">
        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="border py-2 px-4 rounded-md font-semibold bg-blue-600 text-white"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="border py-2 px-4 rounded-md font-semibold bg-green-600 text-white"
          >
            Save
          </button>
        )}
      </div>
      <form
        className="max-w-5xl mx-auto bg-[#F4F3F0] px-4 md:px-8 py-4 "
        onSubmit={handleSubmit}
      >
        <h6 className="text-blueGray-400 text-3xl mt-3 mb-6 font-bold text-center">
          User Profile ({userData.role || ''})
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative w-full mb-3 flex justify-center">
              <img
                className="w-96 rounded-lg"
                src={userData?.photoURL}
                alt=""
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={userData.name || ''}
                onChange={handleChange}
                readOnly={!editable}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={userData.email || ''}
                readOnly
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="district"
              >
                District
              </label>
              <select
                name="district"
                id="district"
                required
                value={userData.district || ''}
                onChange={handleChange}
                disabled={!editable}
                className="block w-full px-36 py-3 text-gray-950 bg-white border border-gray-300 rounded-lg dark:text-gray-950 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Select District Name</option>
                {district.map(item => (
                  <option key={item.id} value={item.bn_name}>
                    {item.bn_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="upazila"
              >
                Upazila
              </label>
              <select
                name="upazila"
                id="upazila"
                placeholder="Upazila"
                value={userData.upazila || ''}
                onChange={handleChange}
                disabled={!editable}
                required
                className="block w-full px-36 py-3 text-gray-950 bg-white border border-gray-300 rounded-lg dark:text-gray-950 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Select Upazila</option>
                {upazila.map(item => (
                  <option key={item.id} value={item.bn_name}>
                    {item.bn_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Blood Group Select */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="bloodGroup"
              >
                Blood Group
              </label>
              <select
                name="bloodGroup"
                required
                value={userData.bloodGroup || ''}
                onChange={handleChange}
                disabled={!editable}
                className="block w-full px-36 py-3 text-gray-950 bg-white border border-gray-300 rounded-lg dark:text-gray-950 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>
        {editable && (
          <div className="w-full px-4">
            <div className="relative w-full mb-3">
              <input
                className="border w-full py-2 rounded-md font-semibold bg-green-700 active:bg-green-900 text-white"
                type="submit"
                value="Update Profile"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
