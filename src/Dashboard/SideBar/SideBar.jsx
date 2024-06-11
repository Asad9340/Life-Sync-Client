import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import { UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';

const SideBar = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOUt = () => {
    logOut();
    navigate('/');
  };

  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      setUserData(data[0]);
    })();
  }, [user?.email]);
  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Link to="/">
            <Typography variant="h5" color="blue-gray">
              Home
            </Typography>
          </Link>
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
            </>
          )}
          {userData?.role === 'donor' && (
            <>
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
          {userData?.role === 'admin' && (
            <>
              <Link to="all-blood-donation-request">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  All Blood Donation Request
                </ListItem>
              </Link>
            </>
          )}
          {userData?.role === 'admin' && (
            <>
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
          <ListItem onClick={handleLogOUt}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default SideBar;
