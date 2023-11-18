import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css'

const HeroSection = () => {
  return (
    <header>

    <section className='heroSectionShadowCSS h-[92vh] w-full bg-gradient-to-b from-white to-violet-400 flex flex-wrap items-center justify-center py-6 px-3 sm:px-8 '>

        <div className='sm:w-[50%] h-fit'>
        {/* <h2 >Discover a world of insights and inspiration at your fingertips - welcome to BLOOGER's, your new favorite space for captivating stories and ideas!</h2> */}

        <h2 className='textCSS sm:my-10 my-2 sm:text-3xl text-xl font-bold sm:leading-[50px] leading-[40px] text-center font-sans sm:pr-10 px-2  '> BLOOGER's <br /> Your gateway to inspiring stories and insightful ideas, all at your fingertips!  ___<i className="font-thin  ri-pencil-line" /></h2>
 
        <motion.h2
        animate={{ scale: [1, 0.8, 1] }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
        }}
        className='my-6 text-center text-blue-600 sm:text-3xl text-xl '>
            <Link to='/create'>Post your first BLOG</Link>
        </motion.h2>
        </div>

        <div className='sm:mb-0 mb-10 sm:w-[50%] flexCenter'>
            <img src="https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=600" alt="err" className='w-full h-auto rounded-xl '/>
        </div>


        <motion.div
        animate={{ translateY: [1, -20, 1] }}
        transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
        }}
        className='sm:hidden flex' >
            <i className="text-5xl ri-arrow-down-line"></i>
        </motion.div>

    </section>


    <main>

    </main>
    </header>

  )
}

export default HeroSection