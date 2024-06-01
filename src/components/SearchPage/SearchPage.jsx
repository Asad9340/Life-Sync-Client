import  { useEffect, useState } from 'react';

const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [upazilaName, setUpazilaName] = useState('');
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
  const handleSearch = () => {
    const dummyData = [
      {
        name: 'John Doe',
        bloodGroup: 'A+',
        district: 'Dhaka',
        upazila: 'Gulshan',
      },
      {
        name: 'Jane Smith',
        bloodGroup: 'B-',
        district: 'Chittagong',
        upazila: 'Bayezid',
      },
      // Add more dummy data as needed
    ];
    // Filtering based on the input values
    const filteredResults = dummyData.filter(donor => {
      return (
        (bloodGroup === '' || donor.bloodGroup === bloodGroup) &&
        (district === '' || donor.district === district) &&
        (upazila === '' || donor.upazila === upazila)
      );
    });
    setSearchResults(filteredResults);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Search Donors</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="bloodGroup" className="block mb-1">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            className="block w-full border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            value={bloodGroup}
            onChange={e => setBloodGroup(e.target.value)}
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
          <label htmlFor="district" className="block mb-1">
            District
          </label>
          <select
            id="district"
            className="block w-full border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            value={districtName}
            onChange={e => setDistrictName(e.target.value)}
          >
            <option value="">Select District</option>
            {district.map(item => (
              <option key={item.id} value={item.bn_name}>
                {item.bn_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="upazila" className="block mb-1">
            Upazila
          </label>
          <select
            id="upazila"
            className="block w-full border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            value={upazilaName}
            onChange={e => setUpazilaName(e.target.value)}
          >
            <option value="">Select Upazila</option>
            {upazila.map(item => (
              <option key={item.id} value={item.bn_name}>
                {item.bn_name}
              </option>
            ))}
          </select>
        </div>
        {/* Similar input fields for district and upazila */}
        {/* Search button */}
      </div>
      <div className="col-span-2">
        <button
          className="bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* Display search results */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <ul>
          {searchResults.map((donor, index) => (
            <li key={index}>
              {donor.name} - {donor.bloodGroup} - {donor.district} -{' '}
              {donor.upazila}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
