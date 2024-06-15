import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';
import AdminAnalysis from './AdminAnalysis';

function Board() {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  const [myDonationReq, setMyDonationReq] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      setUserData(data[0]);
    })();
  }, [user?.email]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/donation-requests/${user?.email}`
      );
      const filteredData = data.slice(0, 3);
      setMyDonationReq(filteredData);
    })();
  }, [user?.email]);
  console.log(myDonationReq);
  return (
    <div>
      <h2 className="text-3xl font-bold m-6 md:m-10 text-center">
        Hello {userData?.name}. Welcome to LifeSync
      </h2>
      {userData?.role === 'donor' && (
        <>
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
                {myDonationReq.map((donation, index) => (
                  <tr key={donation?._id}>
                    <th>{index + 1}</th>
                    <td>{donation?.recipientName}</td>
                    <td>{donation?.address}</td>
                    <td>{donation?.donationDate}</td>
                    <td>{donation.donationTime}</td>
                    <td>{donation?.status}</td>
                    <td>
                      <button className="btn btn-outline btn-primary btn-sm">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-error btn-sm">Delete</button>
                    </td>
                    <th>1</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {userData?.role === 'admin' && <AdminAnalysis />}
      {userData?.role === 'volunteer' && <AdminAnalysis />}
    </div>
  );
}

export default Board;
