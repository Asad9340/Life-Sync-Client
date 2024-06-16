import { Link } from 'react-router-dom';
import { FaHeartbeat, FaTint } from 'react-icons/fa';

const BloodDonationFeatured = () => {
  return (
    <section className="bg-blue-100 py-12 rounded-md">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">
            Save Lives with Your Blood Donation
          </h2>
          <p className="text-blue-600 mt-4">
            Your donation can save lives. Join our blood donation campaign and
            make a difference today!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
            <FaHeartbeat className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Why Donate Blood?
            </h3>
            <p className="text-gray-700 mb-4">
              Donating blood is a simple act that can save lives. Learn more
              about the benefits and the impact you can make.
            </p>
            <Link
              to="/why-donate"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Learn More
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
            <FaTint className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              How to Donate?
            </h3>
            <p className="text-gray-700 mb-4">
              Find out how you can donate blood and become a hero. Follow these
              simple steps to get started.
            </p>
            <Link
              to="/donation-request"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodDonationFeatured;
