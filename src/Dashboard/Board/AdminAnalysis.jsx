import { BiSolidDonateBlood } from 'react-icons/bi';
import { RiRefund2Line } from 'react-icons/ri';
import { MdBloodtype } from 'react-icons/md';
const AdminAnalysis = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome to Admin Data Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-center">
            <BiSolidDonateBlood className="text-8xl" />
          </div>
          <h2 className="text-xl font-semibold text-center">Total Donors</h2>
          <p className="text-center">$1,500,000</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-center">
            <RiRefund2Line className="text-8xl" />
          </div>
          <h2 className="text-xl font-semibold text-center">Website Traffic</h2>
          <p className="text-center">50,000</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-center">
            <MdBloodtype className="text-8xl" />
          </div>
          <h2 className="text-xl font-semibold text-center">User Engagement</h2>
          <p className="text-center">10,000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalysis;
