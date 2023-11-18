import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

// Aimation on scroll - Zoom in animation
import 'aos/dist/aos.css'; 
import AOS from 'aos';
AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;

const BlogCard = ({img,title,discription,username,id,isUser,time}) => {

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-detail/${id}`);
  }
  const handleDelete = async () => {
    try{
      const {data} = await axios.delete(`${baseURl}/api/v1/blog/delete/${id}`);
      if(data.success){
        toast.error("Blog deleted")
        navigate('/blogs')
        // window.location.reload();
      }
    }
    catch(err){
      console.log("Error from delete handler → ",err);
    }
  }
  return (
    <section 
    data-aos="zoom-in"
    data-aos-delay="50"
    className='flex sm:mx-auto sm:flex-row sm:w-[90%] sm:item-start sm:mt-10 sm:rounded-none flex-col items-center justify-center mt-6 gap-y-2 mx-3 shadow-2xl shadow-[#000000df] rounded-xl overflow-hidden'>
        
        <div className='sm:h-[340px] sm:w-[60%] sm:overflow-hidden sm:flexCenter'>
        {/* <div className='sm:h-[340px] sm:w-[55%] sm:overflow-hidden sm:relative'> */}
            <img className='sm:w-full sm:h-full object-cover' src={img} alt="" />
            {/* <img className='sm:absolute sm:top-[50%] sm:left-[50%] sm:-translate-x-[50%] sm:-translate-y-[50%] sm:max-h-none' src={img} alt="" /> */}
        </div>

        <main className='w-full flex-col flex gap-y-2 justify-between  items-start pb-6 pt-2 px-4 sm:px-6'>


          <div className='flex w-[100%] justify-between items-center'>
          <h2 className='font-bold text-3xl sm:text-2xl md:text-4xl  capitalize'>{username}</h2>
          <div>
          {
            isUser ? 
            <div className='flex gap-x-3 text-2xl md:text-4xl '>
            <button onClick={handleEdit}><i className="ri-pencil-line text-blue-500" /></button>
            <button onClick={handleDelete}><i className="ri-delete-bin-line text-red-500" /></button>
            </div> : <></>
          }</div>
          </div>

        <h2 className='text-sm'>{time}</h2>
        <h2 className="font-bold text-xl sm:text-2xl">{title}</h2>
        <p className='sm:text-xl text-sm'>{discription.slice(0, 100) + '...'}</p>
        <Link to={`/read/${id}`} className='text-blue-500 hover:scale-105 hover:font-bold  transition-all '>Read more...</Link>
        </main>


        
    </section>


//   ====== previous card =====
    // <main 
    // data-aos="zoom-in"
    // data-aos-delay="50"
    // className='flex flex-col items-center justify-center max-w-[570px] mt-6 gap-y-2  sm:mx-auto mx-3 shadow-2xl shadow-[#000000df] rounded-xl overflow-hidden'>
        
    //     <div className=''>
    //         <img className=' shadow-transparent shadow-2xl' src={img} alt="" />

    //     </div>
    //     <div className='w-full flex justify-between items-center pt-2 px-4'>
    //       <h2 className='font-bold text-3xl sm:text-2xl capitalize'>{username}</h2>
          
    //       <div>
    //       {
    //         isUser ? 
    //         <div className='flex gap-x-3 text-2xl'>
    //         <button onClick={handleEdit}><i className="ri-pencil-line text-blue-500" /></button>
    //         <button onClick={handleDelete}><i className="ri-delete-bin-line text-red-500" /></button>
    //         </div> : <></>
    //       }
    //       </div>
    //     </div>

    //     <h2 className='px-4 text-left w-full text-sm'>{time}</h2>
    //     <h2 className="px-4 w-full text-left font-bold text-xl sm:text-2xl">{title}</h2>
    //     <p className='px-4 pb-4 w-full text-left sm:text-xl text-sm'>{discription}</p>

        
    // </main>
  )
}

export default BlogCard