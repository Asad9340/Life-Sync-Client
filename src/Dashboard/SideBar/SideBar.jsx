import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPowerOff, FaTimes } from 'react-icons/fa';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';

const SideBar = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      setUserData(data[0]);
    })();
  }, [user?.email]);

  return (
    <div className="relative">
      <button
        className="absolute top-4 left-4 md:hidden z-50 p-2 bg-gray-800 text-white rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu />
      </button>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <Card
        className={`h-full w-64 bg-white shadow-xl shadow-blue-gray-900/5 p-4 transition-transform transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static fixed top-0 left-0 z-50`}
      >
        <div className="mb-2 p-4 flex justify-between items-center">
          <Link to="/">
            <Typography variant="h5" color="blue-gray">
              Home
            </Typography>
          </Link>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <List>
          <Link to="/dashboard">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link to="profile">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          {userData?.role === 'donor' && (
            <>
              <Link to="my-donation-request">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  My Donation Requests
                </ListItem>
              </Link>
              <Link to="create-donation-request">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Create Donation Request
                </ListItem>
              </Link>
            </>
          )}
          {userData?.role === 'admin' && (
            <>
              <Link to="all-users">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  All Users
                </ListItem>
              </Link>
            </>
          )}
          {(userData?.role === 'admin' || userData?.role === 'volunteer') && (
            <>
              <Link to="all-blood-donation-request">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  All Blood Donation Request
                </ListItem>
              </Link>
              <Link to="content-management">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Content Management
                </ListItem>
              </Link>
            </>
          )}
          <hr className="my-10" />
          <ListItem onClick={handleLogOut}>
            <ListItemPrefix>
              <FaPowerOff />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default SideBar;
