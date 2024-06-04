import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';
import AdminAnalysis from './AdminAnalysis';

function Board() {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      console.log(data[0]?.role);
      setUserData(data[0]);
    })();
  }, [user?.email]);
  return (
    <div className="text-3xl font-bold m-6 md:m-10 text-center">
      Hello {userData?.name}. Welcome to LifeSync
      {userData?.role === 'donor' && (
        <>
          <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th></th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Emran</td>
                  <td>Dhaka</td>
                  <td>01/02/2024</td>
                  <td>11:04PM</td>
                  <td>Pending</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-error btn-sm">Delete</button>
                  </td>
                  <th>1</th>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Emran</td>
                  <td>Dhaka</td>
                  <td>01/02/2024</td>
                  <td>11:04PM</td>
                  <td>Pending</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-error btn-sm">Delete</button>
                  </td>
                  <th>1</th>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Emran</td>
                  <td>Dhaka</td>
                  <td>01/02/2024</td>
                  <td>11:04PM</td>
                  <td>Pending</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-error btn-sm">Delete</button>
                  </td>
                  <th>1</th>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {userData?.role === 'admin' && <AdminAnalysis />}
    </div>
  );
}

export default Board;
