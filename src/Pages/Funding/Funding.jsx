import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Funding = () => {
  const [fundings, setFundings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fundingsPerPage] = useState(10);

  useEffect(() => {
    const fetchFundings = async () => {
      const response = await axios.get('http://localhost:5000/fundings');
      setFundings(response.data);
    };

    fetchFundings();
  }, []);

  // Get current fundings
  const indexOfLastFunding = currentPage * fundingsPerPage;
  const indexOfFirstFunding = indexOfLastFunding - fundingsPerPage;
  const currentFundings = fundings.slice(
    indexOfFirstFunding,
    indexOfLastFunding
  );

  return (
    <div className="container mx-auto px-4 my-10">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold">Funding Page</h1>
        <Link to="/checkout">
          <button className="btn btn-primary">Donate some Money</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentFundings.map(funding => (
              <tr key={funding.id}>
                <td className="py-2 px-4 border-b">{funding.name}</td>
                <td className="py-2 px-4 border-b">{funding.amount}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(funding.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
