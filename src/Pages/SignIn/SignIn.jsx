import logo from '../../assets/images/logo.png'
function SignIn() {
  return (
    <div className="my-10">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
        <div className="flex justify-center mx-auto">
          <img className="w-32" src={logo} alt="" />
        </div>

        <form className="mt-6">
          <div>
            <label htmlFor="username" className="block text-sm text-black">
              Username
            </label>
            <input
              type="text"
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
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <div className='flex justify-end my-2'>
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-600 hover:underline"
              >
                Forget Password?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-base font-light text-center text-gray-800">
          {' '}
          Do not have an account?{' '}
          <a
            href="#"
            className="font-medium text-gray-700 dark:text-gray-600 hover:underline"
          >
            Create One
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
