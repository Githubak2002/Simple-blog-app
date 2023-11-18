import axios from 'axios';
import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// input tailwind css
const ipCss = " border-b-2 focus:outline-none p-2 w-full";
const inputCss = "border-black p-2 border-2 w-full rounded-md";
const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;

const BlogDetail = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const [blog,setBlog] = useState({});
    const [inputs,setInputs] = useState({});

    // getting blog details
    const getBlogDetail = async () => {
        try{
            const {data} = await axios.get(`${baseURl}/api/v1/blog/a-blog/${id}`);
            if(data?.success){
                // console.log(data.blog);
                // console.log(data.blog.title);
                setBlog(data?.blog);
                setInputs({
                    title:data?.blog.title,
                    discription:data?.blog.discription,
                    image:data?.blog.img,
                })
            }
        }catch(err){
            console.log("Error in get blog detail function → ",err);
        }
    } 
    const onChangeHandler = (e) => {
        setInputs((pre) => ({
                ...pre,
                [e.target.name]:e.target.value
        }))
    } 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`${baseURl}/api/v1/blog/update/${id}`,
            {
                title:inputs.title,
                discription:inputs.discription,
                img:inputs.image,
                // user:id
            })
            if(data?.success){
                toast.success("Blog Updated.");
                navigate('/users-blogs')
            }
        }
        catch(err){
        console.log("Error in updating a blog function → ",err);
        }
    } 

    useEffect(() => {
        getBlogDetail();
    }, [id])
    

  return (
    <section className='min-h-[70vh] bgImg pt-4'>
      <h2 className='text-center text-xl font-bold my-5'>BLOG DETAIL/EDIT</h2>

      <main className='flex justify-evenly items-center'> 

        <motion.form
         initial={{opacity:0, scale:0}}
         animate={{opacity:1, scale:1}}
         transition={{ duration: 0.3 }}
        className='w-full max-w-[780px] mx-4 px-6 pt-12 flex flex-col gap-y-4 ' onSubmit={handleSubmit}>

            <input className={`${ipCss} italic font-black text-xl sm:text-3xl`}  onChange={onChangeHandler} type="text" placeholder='title' value={inputs.title} name="title" required />

            <textarea rows='5' className={`${ipCss} min-h-[20vh]`}  onChange={onChangeHandler} type="text" placeholder='Discription' value={inputs.discription} name="discription" required/>
            <input className={ipCss} onChange={onChangeHandler} type="text" placeholder='Imgae URL' value={inputs.image} name="image" required/>
    
            <motion.button 
            animate={{ scale: [1, 0.8, 1] }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }}

            className="className=' text-xl sm:text-3xl lg:text-black text-blue-500  focus:outline-none mt-6 w-fit p-2 font-thin hover:text-blue-500 hover:font-black" type='submit'>Update Blog</motion.button>
        </motion.form>
      </main>

    </section>
  )
}

export default BlogDetail
