import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewDetails() {
  const [donationRequestSingleData, setDonationRequestSingleData] = useState(
    []
  );
  const [control, setControl] = useState(false);
  const { _id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/donation-requests/single/${_id}`
      );
      setDonationRequestSingleData(data);
    })();
  }, [_id, control]);
console.log(donationRequestSingleData)
  const handleDonate = () => {
    Swal.fire({
      title: 'Want to Donate?',
      text: "You won't be able to change this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I want to Donate!',
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await axios.patch(
          `https://life-sync-server.vercel.app/donation-requests/single-update/${_id}`
        );
        if (response.data.modifiedCount) {
          Swal.fire('Successful updated Status');
          setControl(!control);
        }
      }
    });
  };

  return (
    <div className="my-8 lg:my-12">
      {donationRequestSingleData.map(data => (
        <div
          key={data?._id}
          className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Donation Details
          </h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
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
            <h2 className="text-xl font-semibold mb-2">Donation Information</h2>
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
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="mb-1">
              <strong>Email:</strong> {data.email}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>{data.address}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{data.description}</p>
          </div>
          <div>
            <button
              onClick={handleDonate}
              className="btn btn-wide bg-blue-900 text-white hover:bg-blue-600 active:bg-blue-800"
            >
              Donate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewDetails;
