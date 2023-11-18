import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/store';
import 'remixicon/fonts/remixicon.css'
import toast from 'react-hot-toast';

const navCss = "hover:scale-110 transition-all"; 
const Nav = () => {

  // global state
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const [menu,setMenu] = useState("hidden");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    toast.success("Logout successfully");
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
    setMenu("hidden")
  }
  
  return (
    <nav className='flex justify-between items-center sm:px-8  border-slate-700 py-[2vh] shadow-2xl border-b-2 bg-white '>

      <Link className={`logoFont sm:p-0 pl-4 font-thin md:text-3xl text-xl`} to='/'> BL00GERS <i className="ri-box-3-line" /> </Link>

      {/* ==== nav for laptop and tablet size screen ==== */}
      <main className='sm:flex hidden text-xl font-black'>
      {
          isLogin 
          ? 
            <div className='flex gap-x-6 text-xl font-bold'>
              <Link className={navCss} to="/blogs"> HOME </Link>
              <Link className={navCss} to="/users-blogs"> MY-BLOGS </Link>
              <Link className={navCss} to="/create">WRITE <i className=" ml-[-8px] font-thin  ri-pencil-line" /></Link>
              <Link onClick={logoutHandler} className={navCss} to=""> LOGOUT 
              <i className="pl-2 font-light ri-logout-box-r-line" />
              </Link> 
            </div>
          : 
            <>  
              <div className='flex gap-x-4'>
                <Link className={navCss} to="/"> Home </Link>
                <Link className={navCss} to="/login"> Login </Link>
                <Link className={navCss} to="/register"> Register </Link>
                <Link className={navCss} to="/login"> Write <i className=" ml-[-8px] font-thin  ri-pencil-line" /></Link>
              </div>
            </> 
          }
      </main>


      {/* ==== nav for mobile size screen ==== */}
      <i onClick={() => setMenu("flex")} className="sm:hidden hover:cursor-pointer pr-4 text-xl font-bold ri-menu-2-fill"></i>
      <main 
      className={`z-50 fixed top-0 sm:hidden h-screen ${menu} items-center justify-center  bg-gradient-to-r from-[#e3e3e3] to-[#dbdbfffd] shadow-2xl shadow-slate-700  border-b-2 border-black w-full font-bold text-xl`}
      >
      {
          isLogin 
          ? 
            <div className='py-7 flex flex-col items-start gap-y-6'>
              <i onClick={() => setMenu("hidden")} className=" hover:cursor-pointer  absolute top-[2%] right-[4%] text-3xl ri-close-line" />
              <Link onClick={()=> setMenu("hidden")} to="/blogs"> → HOME </Link>
              <Link onClick={()=> setMenu("hidden")}  to="/create">→ WRITE 
                <i className="pl-2 font-light  ri-pencil-line"></i>
              </Link>
              <Link onClick={()=> setMenu("hidden")} to="/users-blogs"> → MY-BLOGS </Link>
              <Link onClick={logoutHandler} to="">→ LOGOUT   
                <i className="pl-2 font-light ri-logout-box-r-line" />
              </Link> 
            </div>
          : 
            <>  <div className='py-7 flex flex-col items-start gap-y-6'>
              <i onClick={() => setMenu("hidden")} className=" hover:cursor-pointer  absolute top-[2%] right-[4%] text-3xl ri-close-line" />
              <Link onClick={()=> setMenu("hidden")} to="/blogs"> → HOME </Link>
              <Link onClick={() => setMenu("hidden")} to="/login">→ LOGIN </Link>
              <Link onClick={() => setMenu("hidden")} to="/register"> → REGISTER </Link>
              <Link onClick={() => setMenu("hidden")} to="/login"> → WRITE 
                <i className="pl-2 font-light  ri-pencil-line"></i>
              </Link>
                </div>

            </> 
          }
      </main>


    </nav>
  )
}

export default Nav