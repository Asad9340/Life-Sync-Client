import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';
import AdminAnalysis from './AdminAnalysis';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function Board() {
  const [userData, setUserData] = useState([]);
  const [realData, setRealData] = useState([]);
  const { user } = useContext(AuthContext);
  const [control, setControl] = useState(false);
  const [myDonationReq, setMyDonationReq] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/users/${user?.email}`
      );
      setUserData(data[0]);
    })();
  }, [user?.email]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/donation-requests/${user?.email}`
      );
      setRealData(data);
      const filteredData = data.slice(0, 3);
      setMyDonationReq(filteredData);
    })();
  }, [control, user?.email]);

  const handleDone = async id => {
    const response = await axios.patch(
      `https://life-sync-server.vercel.app/donation-requests/done/${id}`
    );
    if (response.data.modifiedCount) {
      Swal.fire('Successful updated Status to Done');
      setControl(!control);
    }
  };
  const handleCancel = async id => {
    const response = await axios.patch(
      `https://life-sync-server.vercel.app/donation-requests/cancel/${id}`
    );
    if (response.data.modifiedCount) {
      Swal.fire('Successful Cancel Request');
      setControl(!control);
    }
  };
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
          `https://life-sync-server.vercel.app/donation-requests/${id}`
        );
        if (response.data.deletedCount) {
          Swal.fire('Successful Deleted Request');
          setControl(!control);
        }
      }
    });
  };
  const handleViewAllRequest = () => {
    navigate('/dashboard/my-donation-request');
  };
  return (
    <div>
      <h2 className="text-3xl font-bold m-6 md:m-10 text-center">
        Hello {userData?.name}. Welcome to LifeSync
      </h2>
      {userData?.role === 'donor' && (
        <>
          {myDonationReq.length > 0 ? (
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
                    <th></th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View Details</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myDonationReq.map((donation, index) => (
                    <tr key={donation?._id}>
                      <th>{index + 1}</th>
                      <td>{donation?.recipientName}</td>
                      <td>
                        {donation?.recipientUpazila} ,{' '}
                        {donation?.recipientDistrict}
                      </td>
                      <td>{donation?.donationDate}</td>
                      <td>{donation.donationTime}</td>
                      <td>{donation?.status}</td>
                      <td>
                        {' '}
                        {donation?.status == 'inprogress' ? (
                          <>
                            <button
                              onClick={() => handleDone(donation?._id)}
                              className="btn btn-primary mr-2"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => handleCancel(donation?._id)}
                              className="btn btn-secondary"
                            >
                              Cancel
                            </button>
                          </>
                        ) : null}{' '}
                      </td>
                      <td>
                        <Link to={`/dashboard/edit/${donation?._id}`}>
                          <button className="btn btn-outline btn-primary btn-sm">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(donation?._id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                      <th>
                        <Link to={`/dashboard/view-details/${donation?._id}`}>
                          <button className="btn btn-outline btn-sm">
                            Details
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
              {realData.length > 0 ? (
                <div className="text-center my-8 lg:my-12">
                  <button
                    onClick={handleViewAllRequest}
                    className="btn btn-primary"
                  >
                    View My All Request
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="text-red-500 text-center mt-4">
              No donation requests found.
            </div>
          )}
        </>
      )}

      {userData?.role === 'admin' && <AdminAnalysis />}
      {userData?.role === 'volunteer' && <AdminAnalysis />}
    </div>
  );
}

export default Board;
