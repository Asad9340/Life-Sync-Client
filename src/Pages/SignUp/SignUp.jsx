import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
// import logo from '../../assets/images/logo.png';

function SignUp() {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.files[0];
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setError('Password does not match');
      return;
    } else {
      setError('');
    }
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const formData = new FormData();
    formData.append('image', photo);
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        formData
      );
      if (!data.success) {
        return;
      } else {
        var photoURL = data?.data.display_url;
        console.log(photoURL);
      }
    } catch (error) {
      console.log(error.message);
    }

    const user = {
      name,
      email,
      photoURL,
      password,
      confirmPassword,
      bloodGroup,
      district,
      upazila,
      role: 'donor',
      status: 'active',
    };
    console.log(user);
    const { data } = await axios.post(
      `https://life-sync-server.vercel.app/users`,
      user
    );
    console.log(data);
    if (data.insertedId) {
      createUser(email, password)
        .then(result => {
          updateUserProfile(name, photoURL)
            .then(() => {
              setUser(result.user);
              toast.success('Successfully Created Account!');
              navigate('/');
            })
            .catch(err => console.log(err));
        })
        .catch(error => console.log(error.message));
    }
  };

  return (
    <>
      <Helmet>
        <title>Life Sync | Sign Up</title>
      </Helmet>
      <div className="my-8 lg:my-12">
        <section className="bg-white">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex items-center justify-center mt-6">
                <a
                  href="#"
                  className="w-1/3 pb-4 text-3xl md:text-4xl font-semibold lg:font-bold text-center text-gray-800 capitalize dark:border-blue-400"
                >
                  Registration
                </a>
              </div>

              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  className="block w-full py-3   text-gray-950  bg-white border rounded-lg px-11      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Name"
                />
              </div>

              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600   "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>

                <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                <input
                  name="photo"
                  required
                  id="dropzone-file"
                  type="file"
                  className=""
                />
              </label>

              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full py-3   text-gray-950  bg-white border rounded-lg px-11      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                />
              </div>
              <div className="relative flex items-center">
                <div className="relative mt-4">
                  <select
                    name="bloodGroup"
                    required
                    className="block w-full px-36 py-3   text-gray-950  bg-white border border-gray-300 rounded-lg      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" defaultValue="">
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
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
              </div>
              <div className="relative flex items-center">
                <div className="relative mt-4">
                  <select
                    name="district"
                    required
                    onBlur={handleSelectDistrict}
                    className="block w-full px-36 py-3   text-gray-950 bg-white border border-gray-300 rounded-lg dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" defaultValue="">
                      Select District Name
                    </option>
                    {district.map(item => (
                      <option key={item.id} value={item.bn_name}>
                        {item.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="relative mt-4">
                  <select
                    name="upazila"
                    required
                    className="block w-full px-36 py-3   text-gray-950  bg-white border border-gray-300 rounded-lg      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" defaultValue="">
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
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  name="password"
                  className="block w-full px-10 py-3   text-gray-950  bg-white border rounded-lg      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  name="confirmPassword"
                  className="block w-full px-10 py-3   text-gray-950  bg-white border rounded-lg      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirm Password"
                />
              </div>
              <small className="text-red-500">{error}</small>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign Up
                </button>

                <div className="mt-6 text-center ">
                  <Link
                    to="/signin"
                    className="text-sm text-gray-800  dark:text-blue-400"
                  >
                    Already have an account?{' '}
                    <span className="hover:underline">Log In</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignUp;
