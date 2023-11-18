import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Footer = () => {
  return (
    <footer className='pt-4 bg-gradient-to-tr text-white from-black to-[#000000a5] bottom-0 text-center mt-20 pb-10 sm:text-xl flex gap-y-3 flex-col items-center justify-center'>

        <h2>Copyright &#9426; 2023</h2>
        <h2>Made with 💖 by <a  href="https://githubak2002.github.io/akportfolio" target='blank' className='text-xl font-black text-blue-500'>AK</a></h2>

        <h2>Contack us</h2>

        <div className='flex sm:flex-row flex-col sm:gap-x-10 gap-y-4'>
        <a className='hover:scale-125 transition-all w-fit hover:font-bold hover:text-blue-500 '  href='https://www.linkedin.com/in/anuraglohar' target='blank'><i className=" font-light ri-linkedin-box-line" /> LinkedIn </a>

        <a className='hover:scale-125 transition-all w-fit hover:font-bold hover:text-blue-500'  href='https://github.com/Githubak2002' target='blank'><i className=" font-light ri-github-line" /> GitHub </a>
        </div>
    </footer>
  )
}

export default Footer