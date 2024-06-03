import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';

function AllUsers() {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/users`);
      console.log(data[0]?.role);
      setUserData(data);
    })();
  }, [user?.email]);
  console.log(userData);
  return (
    <div className='my-10'>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Avatar</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Block</th>
              <th>Unblock</th>
              <th>Make Volunteer</th>
              <th>Make Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {userData?.map(item => (
              <tr key={item._id}>
                <td>
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item?.photoURL} alt="" />
                  </div>
                </td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>{item?.status}</td>
                <td>
                  <button className="btn btn-sm btn-active btn-error">
                    Block
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-active btn-primary">
                    Unblock
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-active btn-primary">
                    Volunteer
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-active btn-primary">
                    Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
