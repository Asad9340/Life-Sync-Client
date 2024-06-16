import { useState, useRef, useContext } from 'react';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';
import { AuthContext } from '../../Firebase/AuthProvider';

function AddBlogPage() {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);
  const handleSubmit = async e => {
    e.preventDefault();
    const title = e.target.title.value;
    const photo = e.target.photo.files[0];
    const formData = new FormData();
    formData.append('image', photo);
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        formData
      );
      if (!data.success) {
        return;
      } else {
        var photoURL = data?.data.display_url;
        console.log(photoURL);
      }
    } catch (error) {
      console.log(error.message);
    }
    const blogPost = {
      title,
      photoURL,
      content,
      status: 'Draft',
      authorEmail: user.email,
      authorName: user.displayName,
      createdAt: new Date(),
    };
    console.log(blogPost);
    const { data } = await axios.post(
      `https://life-sync-server.vercel.app/blog-post`,
      blogPost
    );
    console.log(data);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-semibold text-center mt-10 lg:mt-20">
        Add Blog Page
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 -mb-4"
          >
            Title:
          </label>{' '}
          <br />
          <input
            type="text"
            name="title"
            required
            className="block w-full py-3   text-gray-950  bg-white border rounded-lg px-11      dark:text-gray-950  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Title"
          />
        </div>
        <div>
          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2  rounded-lg cursor-pointer dark:border-gray-600   "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <h2 className="mx-3 text-gray-400">Thumbnail Image</h2>

            <input
              name="photo"
              required
              id="dropzone-file"
              type="file"
              className=""
            />
          </label>
        </div>
        <div className="mt-8">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)}
          />

          <div>{HTMLReactParser(content)}</div>
        </div>
        <div className="mt-8 w-full">
          <button type="submit" className="btn btn-success w-full text-white">
            Success
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlogPage;
