import  { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Firebase/AuthProvider';

function MyDonationReq() {
  const [myDonationReq, setMyDonationReq] = useState([]);
  const [control, setControl] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(5); // Set donations per page
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/donation-requests/${user?.email}`
      );
      setMyDonationReq(data);
    })();
  }, [control, user?.email]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://life-sync-server.vercel.app/donation-requests/${id}`
        );
        if (response.data.deletedCount) {
          Swal.fire(
            'Deleted!',
            'Your donation request has been deleted.',
            'success'
          );
          setControl(!control);
        }
      }
    });
  };

  const handleStatusChange = event => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Filter donations
  const filteredDonations = statusFilter
    ? myDonationReq.filter(donation => donation.status === statusFilter)
    : myDonationReq;

  // Get current donations
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

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

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th></th>
            <th>Recipient Name</th>
            <th>Recipient Location</th>
            <th>Donation Date</th>
            <th>Donation Time</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1 + (currentPage - 1) * donationsPerPage}</th>
              <td>{item.recipientName}</td>
              <td>{item.address}</td>
              <td>{item.donationDate}</td>
              <td>{item.donationTime}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/dashboard/edit/${item._id}`}>
                  <button className="btn btn-outline btn-primary btn-sm">
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={`/dashboard/view-details/${item._id}`}>
                  <button className="btn btn-outline btn-sm">Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredDonations.length / donationsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 m-1 ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default MyDonationReq;
