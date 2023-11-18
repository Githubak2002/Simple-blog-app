import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

// Aimation on scroll - Zoom in animation
import 'aos/dist/aos.css'; 
import AOS from 'aos';
AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const Register = () => {

  const navigate = useNavigate();
  const [input,setInput] = useState({
    name:"",
    email:"",
    password:""
  })
  const handleChange = (e) => {
    const {name,value} = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]:value 
    }));
  }
  const submithandler = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(`${baseURl}/api/v1/user/register`, {userName:input.name,email:input.email,password:input.password});
      if(data.success){
        toast.success('User Registered successfuly.');
        navigate('/login');
      }
    }
    catch(err){
      console.log("Error in submit handler function ",err);
    }
  }
  return (
    <main 
    data-aos="zoom-in"
    className='h-[70vh] flexCenter'>

      <form className=' shadow-2xl border-2 border-black mt-6 px-4 py-6 flex-col flex items-center gap-y-3 justify-center' action="" onSubmit={submithandler}>

      <h2 className='font-bold text-xl my-2'>REGISTER</h2>

      <input className='border-2 border-black p-2 ' type="text" name='name' value={input.name} onChange={(e) => handleChange(e)} placeholder='Name' required/>
      <input className='border-2 border-black p-2 ' type="email" name='email' value={input.email} onChange={(e) => handleChange(e)} placeholder='Email' required/>
      <input className='border-2 border-black p-2 ' type="password" name='password' value={input.password} onChange={(e) => handleChange(e)} placeholder='Password' required/>

      <button className='my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105'>Submit</button>
      
      <div className='flex'>
        <h2>Already registered?  
        <span className='hover:cursor-pointer text-blue-600' onClick={()=> navigate('/login')} > Login </span>
        </h2>
      </div>
      </form>

    </main>
  )
}

export default Register