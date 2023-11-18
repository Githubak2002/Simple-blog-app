import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

// input tailwind css
const inputCss = "border-black rounded-md border-2 p-2 w-full";
const ipCss = " border-b-2 focus:outline-none p-2 w-full";
const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;

const CreateBlog = () => {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        title:"",
        discription:"",
        image:""
    });
    const onChangeHandler = (e) => {
        setInputs((pre) => ({
            // const {title,}
                ...pre,
                [e.target.name]:e.target.value
        }))
    } 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userid = localStorage.getItem("userId");
        // console.log(inputs);
        const currentDate = new Date();

        //==== Format the date
        const options = {
        year: 'numeric', 
        month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        };

        const formattedDate = currentDate.toLocaleString('en-US', options);
        // console.log(formattedDate);
        try{
            // http://localhost:8080/api/v1/blog/create
            const {data} = await axios.post(`${baseURl}/api/v1/blog/create`,
            {
                title:inputs.title,
                discription:inputs.discription,
                img:inputs.image,
                user:userid,
                tarikh:formattedDate
            })
            if(data?.success){
                toast.success("Blog created.");
                navigate('/users-blogs')
            }
        }
        catch(err){
        console.log("Error in creating a blog function → ",err);
        }
    } 
  return (
    <section className='min-h-[70vh] bgImg pt-4'>
        <h2 className='font-bold text-xl text-center my-6'>POST A NEW BLOG</h2>

        <main className='flex justify-evenly items-center'>

        <motion.form 
        className='w-full max-w-[780px] mx-4 px-6 pt-12 flex flex-col gap-y-4 ' onSubmit={handleSubmit}>
            
            <input className={`${ipCss} italic font-black text-xl sm:text-3xl`} onChange={onChangeHandler} type="text" placeholder='Title' value={inputs.title} name="title" required/>
            
            <textarea rows='5' style={{ whiteSpace: 'pre-wrap' }} className={`${ipCss}  min-h-[20vh]`} onChange={onChangeHandler} type="text" placeholder='Discription...' value={inputs.discription} name="discription" required/>
            
            <input className={`${ipCss} `}  onChange={onChangeHandler} type="text" placeholder='https://Imgae URL' value={inputs.image} name="image" required/>

            <motion.button
            animate={{ scale: [1, 0.8, 1] }}
            transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }}
            className=' text-xl sm:text-3xl lg:text-black text-blue-500  focus:outline-none mt-6 w-fit p-2 font-thin hover:text-blue-500 hover:font-black' type='submit'>Post → </motion.button>

        </motion.form>

        {/* ===================== */}

        {/* <motion.form 
        initial={{opacity:0, scale:0}}
        animate={{opacity:1, scale:1}}
        transition={{ duration: 0.3 }}
        className='border-2 border-slate-400 w-full max-w-[600px] mx-4 px-6 py-12 flex flex-col items-center justify-center gap-y-4 shadow-2xl shadow-[#000000e4] rounded-xl' onSubmit={handleSubmit}>
            <input className={`${inputCss} font-black text-lg`} onChange={onChangeHandler} type="text" placeholder='Title' value={inputs.title} name="title" required/>
            <textarea rows='5' style={{ whiteSpace: 'pre-wrap' }} className={`${inputCss} min-h-[20vh]`} onChange={onChangeHandler} type="text" placeholder='Discription...' value={inputs.discription} name="discription" required/>
            <input className={inputCss} onChange={onChangeHandler} type="text" placeholder='https://Imgae URL' value={inputs.image} name="image" required/>

            <button className='my-3 border-2 border-black p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-110' type='submit'>Post → </button>
        </motion.form> */}
        </main>

    </section>
  )
}

export default CreateBlog