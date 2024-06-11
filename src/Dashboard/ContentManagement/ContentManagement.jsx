import { Link } from "react-router-dom";

function ContentManagement() {
  return (
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
  );
}

export default ContentManagement