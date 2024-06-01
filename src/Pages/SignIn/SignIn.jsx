import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Helmet } from 'react-helmet';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import toast from 'react-hot-toast';
function SignIn() {
  const { loginUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || '/';
  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password)
      .then(result => {
        setUser(result.user);
        toast.success('Login Successfully!');
        navigate(from);
      })
      .catch(() => {
        setError('Wrong Email or Password');
        toast.error('Wrong Email or Password');
      });
  };
  return (
    <div className="my-10">
      <Helmet>
        <title>Life Sync | Sign In</title>
      </Helmet>
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
        <div className="flex justify-center mx-auto">
          <img className="w-32" src={logo} alt="" />
        </div>

        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label htmlFor="Email" className="block text-sm text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-md text-black">
                Password
              </label>
            </div>

            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <div className="flex justify-end my-2">
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-600 hover:underline"
              >
                Forget Password?
              </a>
            </div>
          </div>
          <small className="text-red-700 -mb-3 animate__animated animate__shakeX">
            {error}
          </small>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-base font-light text-center text-gray-800">
          {' '}
          Do not have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-gray-700 dark:text-gray-600 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
