import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";


const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;

const ReadMore = () => {

  const [loading, setLoading] = useState(false);
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  const getBlogDetail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURl}/api/v1/blog/a-blog/${id}`);
      if (data?.success) {
        // console.log(data?.name);
        setLoading(false);
        setInputs({
          name: data?.name,
          title: data?.blog.title,
          discription: data?.blog.discription,
          image: data?.blog.img,
          time: data?.blog.tarikh,
        });
      }
    } catch (err) {
      console.log("Error in get blog detail function → ", err);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  return (
    <>
    { loading ? ( <Loader /> ) : 
    (
    <main className="flex flex-col sm:gap-y-6 gap-y-3 mt-5 sm:mt-8">
      
      <h2 className="sm:text-4xl font-black text-xl sm:px-8 px-4 ">
        {inputs.title}
      </h2>
      <h2 className="sm:text-lg text-sm sm:px-8 px-4"> {inputs.time}</h2>

      <img src={inputs.image} className=" shadow-xl" alt="err" />

      <h2 className="sm:text-4xl text-xl sm:px-8 px-4 font-semibold ">
        {inputs.name}
      </h2>

      <h2 className="sm:leading-[40px] leading-[30px] sm:text-2xl text-md sm:px-8 px-4">
        {inputs.discription}
      </h2>

      <Link
      to='/blogs' 
      className="text-xl sm:text-2xl text-center mt-4 text-blue-500 hover:scale-125 hover:font-bold hover:cursor-pointer transition-all " > Explore more → 
      </Link>
    </main>
    )
    }

    </>
  );
};

export default ReadMore;
