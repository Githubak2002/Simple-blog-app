import React from 'react'
import { Link } from 'react-router-dom'
import err from '../../public/assets/err.png'
const PageNotFound = () => {
  return (
    <main className='h-[68vh] text-3xl text-center flexCenter flex-col '>
        {/* <h2 className='text-red-500 font-black '>404! Page Not Found</h2> */}
        <img className='h-[30vh]' src={err} alt="" />
        <Link className=' text-blue-500 hover:scale-125 transition-all hover:font-black' to='/'>Home page → </Link>
    </main>
  )
}

export default PageNotFound