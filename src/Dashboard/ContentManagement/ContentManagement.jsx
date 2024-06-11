import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';

function ContentManagement() {
  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:5000/blog-post`);
      setBlogPost(data);
    })();
  }, []);

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
  console.log(userData.role);

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
                  <td>{item.status === 'draft' ? 'Draft' : 'Published'}</td>
                  <td>
                    {item.status === 'draft' ? (
                      <button className="btn btn-primary">Published</button>
                    ) : (
                      <button className="btn btn-secondary">Unpublished</button>
                    )}
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
