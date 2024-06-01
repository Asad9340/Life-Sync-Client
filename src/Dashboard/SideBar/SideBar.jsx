import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='m-8 lg:hidden'>
      <GiHamburgerMenu onClick={toggleSidebar} />
      </div>
      <div className="min-h-screen flex flex-row bg-gray-100">
        {/* Sidebar */}
        <div
          className={`flex flex-col w-64 bg-white shadow-md transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          {/* Logo and Toggle Button */}

          <div className="flex items-center justify-between p-4">
            <h1 className="text-3xl text-indigo-500 font-bold">Logo</h1>
            <button
              className="md:hidden text-gray-600 focus:outline-none focus:text-gray-800"
              onClick={toggleSidebar}
            >
              <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
            </button>
          </div>
          {/* Sidebar Links */}
          <ul className="flex flex-col py-2 space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-home text-lg mr-2"></i>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-music text-lg mr-2"></i>
                Music
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-drink text-lg mr-2"></i>
                Drink
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-shopping-bag text-lg mr-2"></i>
                Shopping
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-chat text-lg mr-2"></i>
                Chat
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-user text-lg mr-2"></i>
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-bell text-lg mr-2"></i>
                Notifications
                <span className="ml-auto text-sm bg-red-100 text-red-500 rounded-full px-2 py-1">
                  5
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              >
                <i className="bx bx-log-out text-lg mr-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
