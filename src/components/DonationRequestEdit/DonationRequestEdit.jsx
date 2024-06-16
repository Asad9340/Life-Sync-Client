import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function DonationRequestEdit() {
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const [detailsData, setDetailsData] = useState([]);
  const [control, setControl] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://life-sync-server.vercel.app/donation-requests/view-details/${_id}`
      );
      setDetailsData(response.data);
      setControl(!control);
    })();
  }, [control, _id]);
  const [data] = detailsData;
  console.log(data);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/districts.json');
      const data = await res.json();
      setDistrict(data[2].data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await fetch('/upazilas.json');
      const data = await res.json();
      setUpazila(data[2].data);
    })();
  }, []);

  const handleSelectDistrict = e => {
    console.log('district selected', e.target.value);
    const districtName = e.target.value;
    const districtId = district.findIndex(
      item => item.bn_name === districtName
    );
    const filteredUpazila = upazila.filter(
      item => item.district_id == Number(districtId) + 1
    );
    console.log(filteredUpazila);
    setUpazila(filteredUpazila);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const recipientName = form.recipientName.value;
    const recipientDistrict = form.recipientDistrict.value;
    const recipientUpazila = form.recipientUpazila.value;
    const hospitalName = form.hospitalName.value;
    const address = form.address.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const description = form.textarea.value;
    const email = user?.email;
    const donationRequest = {
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      address,
      donationDate,
      donationTime,
      description,
      status: 'pending',
      email,
    };
    try {
      const res = await axios.patch(
        `https://life-sync-server.vercel.app/donation-requests/edit/${_id}`,
        donationRequest
      );
      if (res.data.modifiedCount) {
        Swal.fire('Successful updated Information');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error creating donation request:', error);
    }
  };
  return (
    <div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold lg:font-bold my-8 lg:my-14 text-center ">
        Edit Donation Request{' '}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg w-full"
      >
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Requester Name
          </label>
          <input
            type="text"
            disabled
            placeholder="Name"
            defaultValue={user?.displayName}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Requester Email
          </label>
          <input
            type="text"
            disabled
            placeholder="Name"
            defaultValue={user?.email}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="recipientName"
          >
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            id="name"
            defaultValue={data?.recipientName}
            placeholder="Name"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="relative mt-4">
          <select
            name="recipientDistrict"
            required
            onBlur={handleSelectDistrict}
            className="block w-full pl-4 py-3 text-gray-950 bg-white border border-gray-300 rounded-lg dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option defaultValue={data?.recipientDistrict}>
              Select District Name
            </option>
            {district.map(item => (
              <option key={item.id} value={item.bn_name}>
                {item.bn_name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-4">
          <select
            name="recipientUpazila"
            required
            className="block w-full pl-4 py-3   text-gray-950  bg-white border border-gray-300 rounded-lg      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="" defaultValue={data?.recipientUpazila}>
              Select Upazila Name
            </option>
            {upazila.map(item => (
              <option key={item.id} value={item.bn_name}>
                {item.bn_name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="hospitalName"
          >
            Hospital Name
          </label>
          <input
            type="text"
            name="hospitalName"
            defaultValue={data?.hospitalName}
            id="hospitalName"
            placeholder="Hospital Name"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="address"
          >
            Full Address
          </label>
          <input
            type="text"
            name="address"
            defaultValue={data?.address}
            id="address"
            placeholder="Full Address"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="donationDate"
          >
            Donation Date
          </label>
          <input
            type="date"
            name="donationDate"
            defaultValue={data?.donationDate}
            id="donationDate"
            placeholder="Donation Date"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="donationTime"
          >
            Donation Time
          </label>
          <input
            type="time"
            name="donationTime"
            defaultValue={data?.donationTime}
            id="donationTime"
            placeholder="Donation Time"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Request Message
          </label>
          <textarea
            placeholder="Description"
            name="textarea"
            defaultValue={data?.description}
            className="textarea textarea-bordered textarea-sm w-full max-w-5xl"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Request
        </button>
      </form>
    </div>
  );
}

export default DonationRequestEdit;
