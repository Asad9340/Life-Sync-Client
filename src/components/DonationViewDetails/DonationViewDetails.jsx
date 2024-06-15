import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DonationViewDetails() {
  const { _id } = useParams();
  const [detailsData, setDetailsData] = useState([]);
  const [control, setControl] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/donation-requests/view-details/${_id}`
      );
      setDetailsData(response.data);
      setControl(!control);
    })();
  }, [control, _id]);
  console.log(detailsData);
  return (
    <div>
      {detailsData.map(data => (
        <div key={data?._id} className="min-h-screen bg-gray-100 py-10">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">
              Donation Details
            </h1>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">
                Recipient Information
              </h2>
              <p className="mb-1">
                <strong>Name:</strong> {data.recipientName}
              </p>
              <p className="mb-1">
                <strong>District:</strong> {data.recipientDistrict}
              </p>
              <p className="mb-1">
                <strong>Upazila:</strong> {data.recipientUpazila}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">
                Donation Information
              </h2>
              <p className="mb-1">
                <strong>Hospital Name:</strong> {data.hospitalName}
              </p>
              <p className="mb-1">
                <strong>Date:</strong> {data.donationDate}
              </p>
              <p className="mb-1">
                <strong>Time:</strong> {data.donationTime}
              </p>
              <p className="mb-1">
                <strong>Status:</strong> {data.status}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="mb-1">
                <strong>Email:</strong> {data.email}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Address</h2>
              <p>{data.address}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DonationViewDetails;
