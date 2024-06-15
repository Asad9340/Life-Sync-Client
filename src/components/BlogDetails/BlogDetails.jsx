import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogDetails() {
  const { _id } = useParams();
  console.log(_id);

  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/blog-post/${_id}`
      );
      setBlogPost(data);
    })();
  }, [_id]);
  console.log(blogPost);
  return (
    <div>
      {blogPost.map(post => (
        <div key={post?._id} className="bg-gray-100 min-h-screen">
          <div className="container mx-auto py-12">
            <div className="max-w-3xl bg-white rounded-lg shadow-md p-6 mx-auto">
              <img
                src={post.photoURL}
                alt={post.title}
                className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
              />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {post.title}
              </h1>
              <p className="text-gray-600 mb-4">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
                <p className="text-gray-500">By {post.author}</p>
                <p className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogDetails;
