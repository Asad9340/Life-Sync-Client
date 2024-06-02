// import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const [logUser, setLogUser] = useState([]);
  // const { data } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => {
  //     const res = await fetch(`http://localhost/5000/users/${user?.email}`);
  //     return res.json();
  //   },
  // });
  // console.log(data);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      setLogUser(data);
    })();
  }, [user?.email]);
  const [
    { name, email, photoURL, district, bloodGroup, upazila, status, role }
  ] = logUser;
  console.log(name);
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-md p-6 md:w-96 sm:w-48">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-white">User Profile</h2>
        <img
          src={photoURL}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-4 border-white"
        />
      </div>
      <div className="mb-4">
        <p className="text-white">Name: {name}</p>
        <p className="text-white">Email: {email}</p>
        <p className="text-white">Blood Group: {bloodGroup}</p>
        <p className="text-white">District: {district}</p>
        <p className="text-white">Upazila: {upazila}</p>
        <p className="text-white">Role: {role}</p>
        <p className="text-white">Status: {status}</p>
      </div>
    </div>
  );
}

export default Profile;
