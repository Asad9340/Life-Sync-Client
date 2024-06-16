import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function MyDonationReq() {
  const [myDonationReq, setMyDonationReq] = useState([]);
  const [control, setControl] = useState(false);
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState(''); // Add state for filter

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/donation-requests/${user?.email}`
      );
      setMyDonationReq(data);
    })();
  }, [control, user?.email]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Sure want to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5000/donation-requests/${id}`
        );
        if (response.data.deletedCount) {
          Swal.fire('Successful Deleted Request');
          setControl(!control);
        }
      }
    });
  };

  const handleStatusChange = event => {
    setStatusFilter(event.target.value); // Update filter state
  };

  const filteredDonations = statusFilter
    ? myDonationReq.filter(donation => donation.status === statusFilter)
    : myDonationReq;

  return (
    <div className="my-10 lg:my-20 mx-4 lg:mx-10">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Filter by Status
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleStatusChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

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
              <th>Delete</th>
              <th>View Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
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
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
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
      </div>
    </div>
  );
}

export default MyDonationReq;
