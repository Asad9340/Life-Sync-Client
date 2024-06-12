import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ContentManagement() {
  const [blogPost, setBlogPost] = useState([]);
  const [control, setControl] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/blog-post`);
      setBlogPost(data);
    })();
  }, [control]);

  const handlePublish = async id => {
    const response = await axios.patch(
      `http://localhost:5000/blog-post/publish/${id}`
    );
    if (response.data.modifiedCount) {
      Swal.fire('Successful updated Status to Publish');
      setControl(!control);
    }
  };
  const handleUnPublish = async id => {
    const response = await axios.patch(
      `http://localhost:5000/blog-post/unpublished/${id}`
    );
    console.log(response);
    if (response.data.modifiedCount) {
      Swal.fire('Successful updated Status to Draft');
      setControl(!control);
    }
  };
  const handleDelete = async id => {
    const response = await axios.delete(
      `http://localhost:5000/blog-post/delete/${id}`
    );
    console.log(response)
    if (response.data.deletedCount) {
      Swal.fire('Successful updated Status to Draft');
      setControl(!control);
    }
  };

  return (
    <>
      <div className="m-6 md:m-16 lg:m-20 grid grid-cols-1 md:grid-cols-2 gap-10 justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold lg:font-bold">
            Content Management Page
          </h2>
        </div>
        <div className=" w-full  flex justify-end items-center">
          <Link to="/dashboard/content-management/add-blog">
            <button className="btn btn-info">Add Blog</button>
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial No:</th>
                <th>Photo URL</th>
                <th>Title</th>
                <th>Content</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {blogPost.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>{item.status === 'Draft' ? 'Draft' : 'Published'}</td>
                  <td>
                    {item.status === 'Draft' ? (
                      <button
                        onClick={() => handlePublish(item._id)}
                        className="btn btn-primary"
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnPublish(item._id)}
                        className="btn btn-secondary"
                      >
                        Unpublished
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={()=>handleDelete(item?._id)} className="btn btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ContentManagement;
