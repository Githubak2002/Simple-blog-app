import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const UsersBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const getUsersBlogs = async () => {
    try {
      setLoading(true);
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `${baseURl}/api/v1/blog/user-blog/${id}`
      );
      // console.log(data?.success);
      // console.log(data.u_Blogs.userName);
      // console.log(data.u_Blogs.blogs[0].createdAt);
      setUserName(data.u_Blogs.userName);
      if (data?.success) {
        setLoading(false);
        const reverseArray = data.u_Blogs.blogs.reverse();
        setBlogs(reverseArray);
        // setBlogs(data.u_Blogs.blogs);
      }
    } catch (err) {
      console.log("Error in getUsersBlogs function → ", err);
    }
  };
  useEffect(() => {
    getUsersBlogs();
  }, []);

  return (
    <section className="min-h-[68vh]">
      <h1 className="text-center pt-10 pb-5 text-3xl font-black">
        All your Blogs
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="px-2">
          {
          blogs.length > 0 ? (
            blogs &&
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                isUser={true}
                title={blog.title}
                img={blog.img}
                // discription={blog.discription.slice(0, 210) + '...'}
                discription={blog.discription}
                username={userName}
                time={blog.tarikh}
              />
            ))
          ) : (
            <div className="text-center pt-[50%] mb-16">
              <h1>No blogs yet!</h1>
              <Link className="text-blue-600" to="/create">
                Post/Create a new blog →{" "}
              </Link>
            </div>
          )}

          <h2 className="sm:text-2xl text-center font-black mt-12 sm:mt-20 hover:cursor-pointer text-blue-500 hover:scale-125 transition-all" >
          <Link to="/blogs"  >Explore All Recent BLOGS → </Link>
          </h2>
        </div>
      )}
    </section>
  );
};

export default UsersBlog;
