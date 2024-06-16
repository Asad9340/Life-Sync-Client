import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';

function AllBloodDonationReq() {
  const [myDonationReq, setMyDonationReq] = useState([]);
  const [control, setControl] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10); // Number of requests per page

  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/users/${user?.email}`
      );
      setUserData(data[0]);
    };
    fetchUserData();
  }, [user?.email]);

  useEffect(() => {
    const fetchDonationRequests = async () => {
      const { data } = await axios.get(
        'https://life-sync-server.vercel.app/donation-requests'
      );
      setMyDonationReq(data);
    };
    fetchDonationRequests();
  }, [control]);

  const handleDelete = async _id => {
    await axios.delete(
      `https://life-sync-server.vercel.app/donation-requests/${_id}`
    );
    setControl(!control);
  };

  // Get current posts
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = myDonationReq.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="my-10 lg:my-20 mx-4 lg:mx-10">
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Donation Status</th>
              <th>Edit</th>
              {userData?.role === 'admin' && <th>Delete</th>}
              <th>View Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1 + (currentPage - 1) * requestsPerPage}</th>
                <td>{item?.recipientName}</td>
                <td>{item?.address}</td>
                <td>{item?.donationDate}</td>
                <td>{item?.donationTime}</td>
                <td>{item?.status}</td>
                <td>
                  <Link to={`/dashboard/edit/${item?._id}`}>
                    <button className="btn btn-outline btn-primary btn-sm">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  {userData?.role === 'admin' && (
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
                <th>
                  <Link to={`/dashboard/view-details/${item?._id}`}>
                    <button className="btn btn-outline btn-sm">Details</button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(myDonationReq.length / requestsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className="px-4 py-2 mx-1 border rounded bg-blue-gray-700 text-white"
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AllBloodDonationReq;
