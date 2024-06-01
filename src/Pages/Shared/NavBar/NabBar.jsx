import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { AuthContext } from '../../../Firebase/AuthProvider';
function NavBar() {
  const { user,logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleToggleMenu = () => {
    setOpen(!open);
  };
 const handleLogOut = () => {
   logOut();
   navigate('/');
 };

  return (
    <nav className="bg-white border-gray-200 py-2.5 ">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-24" alt="Landwind Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            <h2 className="text-black text-3xl lg:text-4xl font-semibold lg:font-bold">
              Life<span className="text-red-500">S</span>ync
            </h2>
          </span>
        </Link>
        <button
          onClick={handleToggleMenu}
          className="inline-block lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            open ? 'block' : 'hidden'
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="flex flex-col items-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink
                to="/donation-request"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
                    : 'flex items-center font-display text-black px-3 py-2'
                }
              >
                Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
                    : 'flex items-center font-display text-black px-3 py-2 font-lato'
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/funding"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center  px-3 py-2 bg-orange-700 text-white rounded-md duration-300 font-semibold  font-lato'
                    : 'flex items-center font-display text-black px-3 py-2 font-lato'
                }
              >
                Funding
              </NavLink>
            </li>
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">Dashboard</a>
                    </li>

                    <li>
                      <p onClick={handleLogOut}>Logout</p>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/signin">
                <button className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-xl">
                  Login
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
