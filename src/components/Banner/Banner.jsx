import { Link } from 'react-router-dom';

const Banner = ({ title, subtitle, image, buttonText1, buttonText2 }) => {
  return (
    <div className="relative  rounded-lg my-10">
      <div className="h-[500px] w-full overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={image}
          alt="Banner"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-lg text-white mb-6">{subtitle}</p>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out mb-4 md:mb-0 md:mr-4"
            >
              {buttonText1}
            </Link>
            <Link
              to="/search"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
            >
              {buttonText2}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
