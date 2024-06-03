
function MyDonationReq() {
  return (
    <div className="my-10 lg:my-20 mx-4 lg:mx-10">
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
    </div>
  );
}

export default MyDonationReq