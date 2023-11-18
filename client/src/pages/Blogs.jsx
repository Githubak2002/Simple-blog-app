import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader.jsx';
import HeroSection from '../components/HeroSection.jsx';

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const Blogs = () => {;

  const [blogs,setBlogs] = useState([]);
  const [loading,setLoading] = useState(false);
  const getAllBlogs = async () => {
    try{
      setLoading(true);
      const {data} = await axios.get(`${backendUrl}/api/v1/blog/all-blogs`);
      // console.log(data);
      // console.log(data.blogs[0]._id);
      // console.log(data.blogs[3].user._id);
      if(data?.success){
        const reverseArray = data?.blogs.reverse();
        setLoading(false);
        setBlogs(reverseArray);
      }
    }
    catch(err){
      console.log("Error in getAllBlogs function ",err);
    }
  }

  useEffect(() => {
    getAllBlogs();
  },[])

  return (
    <main className=''>

      {/* <HeroSection /> */}

      <h1 className='text-center sm:my-16 my-8 sm:text-4xl text-2xl font-black'>Recent Posts</h1>

        {
          loading && <Loader /> 
        }
      <div>
        {
          blogs && blogs.map((blog) => (
              <BlogCard 
              key={blog?._id}
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog?.user?._id}
              title={blog?.title}
              img={blog?.img}
              discription={blog?.discription}
              username={blog?.user?.userName}
              time={blog.tarikh}
              />
            ))
           
        }
      </div>
    </main>
  )
}

export default Blogs
