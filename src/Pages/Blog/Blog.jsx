import axios from 'axios';
import { useEffect, useState } from 'react';

function Blog() {
  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/blog-post/status`
      );
      setBlogPost(data);
    })();
  }, []);
  console.log(blogPost);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPost?.map(post => (
            <div
              key={post?.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={post?.photoURL}
                alt={post?.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {post?.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {new Date(post?.date).toLocaleDateString()}
                </p>
                <div
                  className="text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></div>
                <div className="flex justify-between items-center text-gray-500">
                  <p>By {post?.authorName}</p>
                  <p>{new Date(post?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
