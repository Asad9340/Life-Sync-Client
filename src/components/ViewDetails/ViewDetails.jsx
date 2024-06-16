import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Firebase/AuthProvider';

function ViewDetails() {
  const { user } = useContext(AuthContext);
  const [donationRequest, setDonationRequest] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://life-sync-server.vercel.app/donation-requests/single/${_id}`
      );
      setDonationRequest(response.data);
    };
    fetchData();
  }, [_id]);

  const handleDonate = async () => {
    const { value: amount } = await Swal.fire({
      title: 'Enter your donation amount',
      input: 'number',
      inputLabel: 'Donation Amount',
      inputPlaceholder: 'Enter your amount in USD',
      inputAttributes: {
        'aria-label': 'Type your donation amount here',
      },
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });

    if (amount) {
      Swal.fire(`Your donation of $${amount} has been recorded.`);
      // Simulate a donation process...
    }
  };

  if (!donationRequest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-8 lg:my-12 p-4 md:p-8 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Donation Details</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Recipient Information</h2>
          <p>
            <strong>Name:</strong> {donationRequest.recipientName}
          </p>
          <p>
            <strong>District:</strong> {donationRequest.recipientDistrict}
          </p>
          <p>
            <strong>Upazila:</strong> {donationRequest.recipientUpazila}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Donation Information</h2>
          <p>
            <strong>Hospital Name:</strong> {donationRequest.hospitalName}
          </p>
          <p>
            <strong>Date:</strong> {donationRequest.donationDate}
          </p>
          <p>
            <strong>Time:</strong> {donationRequest.donationTime}
          </p>
          <p>
            <strong>Status:</strong> {donationRequest.status}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p>
          <strong>Email:</strong> {donationRequest.email}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Address</h2>
        <p>{donationRequest.address}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Description</h2>
        <p>{donationRequest.description}</p>
      </div>
      <button
        onClick={handleDonate}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg"
      >
        Donate Now
      </button>
    </div>
  );
}

export default ViewDetails;
