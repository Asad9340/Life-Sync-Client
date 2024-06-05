import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

function AllUsers() {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  const [control, setControl] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/users`);
      setUserData(data);
    })();
  }, [user?.email, control]);
  const handleBlock = async (id, status, role) => {
    if (status == 'active' && role !== 'admin') {
      const response = await axios.patch(
        `http://localhost:5000/users/block/${id}`
      );
      if (response.data.modifiedCount) {
        Swal.fire('Successful updated Status');
        setControl(!control);
      }
    } else if (role === 'admin') {
      Swal.fire('You can not block Admin');
    } else {
      Swal.fire('Status is already Blocked');
    }
  };
  const handleUnBlock = async (id, status, role) => {
    if (status == 'block' && role !== 'admin') {
      const response = await axios.patch(
        `http://localhost:5000/users/active/${id}`
      );
      if (response.data.modifiedCount) {
        Swal.fire('Successful updated Status');
        setControl(!control);
      }
    } else if (role === 'admin') {
      Swal.fire('You can not Unblock Admin');
    } else {
      Swal.fire('Status is already active');
    }
  };
  const handleVolunteer = async (id, role) => {
    if (role == 'donor') {
      const response = await axios.patch(
        `http://localhost:5000/users/volunteer/${id}`
      );
      if (response.data.modifiedCount) {
        Swal.fire('Successful updated Status');
        setControl(!control);
      }
    } else {
      Swal.fire('Account is already Volunteer');
    }
  };
  const handleAdmin = async (id, role) => {
    if (role == 'donor' || role =='volunteer') {
      const response = await axios.patch(
        `http://localhost:5000/users/makeAdmin/${id}`
      );
      if (response.data.modifiedCount) {
        Swal.fire('Successful updated Status');
        setControl(!control);
      }
    } else {
      Swal.fire('Account is already Admin');
    }
  };
  return (
    <div className="my-10">
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
                  <button
                    onClick={() =>
                      handleBlock(item?._id, item?.status, item?.role)
                    }
                    className="btn btn-sm btn-active btn-error"
                  >
                    Block
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleUnBlock(item?._id, item?.status, item?.role)
                    }
                    className="btn btn-sm btn-active btn-primary"
                  >
                    Unblock
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleVolunteer(item?._id, item?.role)
                    }
                    className="btn btn-sm btn-active btn-primary"
                  >
                    Volunteer
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleAdmin(item?._id, item?.role)
                    }
                    className="btn btn-sm btn-active btn-primary"
                  >
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
