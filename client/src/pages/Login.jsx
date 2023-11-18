import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {login} from '../redux/store.js'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

// Aimation on scroll - Zoom in animation
import 'aos/dist/aos.css'; 
import AOS from 'aos';
AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input,setInput] = useState({
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
    // console.log("Hitting");
    // console.log(await axios.post(`${baseURl}/api/v1/user/login`, {email:input.email,password:input.password}) );
    // console.log(data);
    try{
      const {data} = await axios.post(`${baseURl}/api/v1/user/login`, {email:input.email,password:input.password});
      // console.log(data);
      if(data.success){
        localStorage.setItem("userId",data?.user._id);
        dispatch(login());
        toast.success('Logged in successfuly.');
        navigate('/users-blogs');
      }
      if(!data.success){
        toast.error('Incorrect Email or password.');
      }
    }
    catch(err){
      console.log("Error in submit handler function (login) ",err);
    }
  }
  return (
    <main
    data-aos="zoom-in"
    className='h-[70vh] flexCenter flex-col'>

      <form className=' shadow-2xl border-2 border-black mt-12 py-6 px-4 flex-col flex items-center gap-y-3 justify-center' action="" onSubmit={submithandler}>

      <h2 className='font-bold text-xl my-2'>LOGIN</h2>

      <input className='border-2 border-black p-2 ' type="email" name='email' value={input.email} onChange={(e) => handleChange(e)} placeholder='Email' required/>
      <input className='border-2 border-black p-2 ' type="password" name='password' value={input.password} onChange={(e) => handleChange(e)} placeholder='Password' required/>

      <button className='my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105'>Submit</button>
      
      <div className='flex'>
        <h2>Not a user?  
        <span className='hover:cursor-pointer text-blue-600' onClick={()=> navigate('/register')} >  Register here! </span>
        </h2>
      </div>
      </form>

      <h2 className=' text-center font-xl mt-6'>Please LOGIN to write Blog.</h2>

    </main>
  )
}

export default Login