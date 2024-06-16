import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchPage() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch district data
    (async () => {
      const res = await fetch('/districts.json');
      const data = await res.json();
      setDistricts(data[2].data);
    })();
  });

  useEffect(() => {
    (async () => {
      const res = await fetch('/upazilas.json');
      const data = await res.json();
      setUpazilas(data[2].data);
    })();
  }, []);

  const handleSearch = async e => {
    e.preventDefault();
    const { data } = await axios.get(
      'https://life-sync-server.vercel.app/donors',
      {
        params: {
          bloodGroup,
          district: selectedDistrict,
          upazila: selectedUpazila,
        },
      }
    );
    setDonors(data);
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-semibold mb-6">Search Donors</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label
            htmlFor="bloodGroup"
            className="block text-sm font-medium text-gray-700"
          >
            Blood Group
          </label>
          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={e => setBloodGroup(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            District
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="upazila"
            className="block text-sm font-medium text-gray-700"
          >
            Upazila
          </label>
          <select
            id="upazila"
            value={selectedUpazila}
            onChange={e => setSelectedUpazila(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Upazila</option>
            {upazilas.map(upazila => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>
      <div className="mt-10">
        {donors.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Donor Results</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upazila
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donors.map(donor => (
                  <tr key={donor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor.bloodGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor.upazila}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No donors found. Please search using the form above.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
