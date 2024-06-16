import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Firebase/AuthProvider';

function ContentManagement() {
  const [blogPost, setBlogPost] = useState([]);
  const [control, setControl] = useState(false);
  const [userData, setUserData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(''); // Add state for filter
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/users/${user?.email}`
      );
      setUserData(data[0]);
    })();
  }, [user?.email]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://life-sync-server.vercel.app/blog-post`
      );
      setBlogPost(data);
    })();
  }, [control]);

  const handlePublish = async id => {
    const response = await axios.patch(
      `https://life-sync-server.vercel.app/blog-post/publish/${id}`
    );
    if (response.data.modifiedCount) {
      Swal.fire('Successfully updated status to Publish');
      setControl(!control);
    }
  };

  const handleUnPublish = async id => {
    const response = await axios.patch(
      `https://life-sync-server.vercel.app/blog-post/unpublished/${id}`
    );
    if (response.data.modifiedCount) {
      Swal.fire('Successfully updated status to Draft');
      setControl(!control);
    }
  };

  const handleDelete = async id => {
    const response = await axios.delete(
      `https://life-sync-server.vercel.app/blog-post/delete/${id}`
    );
    if (response.data.deletedCount) {
      Swal.fire('Successfully deleted the blog post');
      setControl(!control);
    }
  };

  const handleStatusChange = event => {
    setStatusFilter(event.target.value); // Update filter state
  };

  const filteredBlogPosts = statusFilter
    ? blogPost.filter(post => post.status === statusFilter)
    : blogPost;

  return (
    <>
      <div className="m-6 md:m-16 lg:m-20 grid grid-cols-1 md:grid-cols-2 gap-10 justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold lg:font-bold">
            Content Management Page
          </h2>
        </div>
        <div className="w-full flex justify-end items-center">
          <Link to="/dashboard/content-management/add-blog">
            <button className="btn btn-info">Add Blog</button>
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Filter by Status
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleStatusChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">All</option>
          <option value="Draft">Draft</option>
          <option value="Publish">Published</option>
        </select>
      </div>
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
              {userData?.role === 'admin' && (
                <>
                  <th></th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredBlogPosts.map((item, index) => (
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
                <td>{item.content.slice(3, 50)}...</td>
                <td>{item.status === 'Draft' ? 'Draft' : 'Published'}</td>
                {userData?.role === 'admin' && (
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
                        Unpublish
                      </button>
                    )}
                  </td>
                )}
                {userData?.role === 'admin' && (
                  <td>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ContentManagement;
