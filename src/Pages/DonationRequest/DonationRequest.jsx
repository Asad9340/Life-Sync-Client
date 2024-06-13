import axios from 'axios';
import { useEffect, useState } from 'react';

function DonationRequest() {
  const [donationRequest, setDonationRequest] = useState([]);
  useEffect(() => {
    (async () => {
      const status = 'pending';
      const { data } = await axios.get(
        `http://localhost:5000/donation-requests/home/${status}`
      );
      setDonationRequest(data);
    })();
  }, []);
  console.log(donationRequest);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Data</th>
              <th>Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {donationRequest.map((donation, index) => (
              <tr key={donation?._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{donation?.recipientName}</td>
                <td>
                  {donation?.recipientUpazila}, {donation?.recipientDistrict}
                </td>
                <td>{donation?.donationDate}</td>
                <td>{donation?.donationTime}</td>
                <td><button className='btn btn-success'>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonationRequest;
