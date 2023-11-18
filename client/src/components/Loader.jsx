import React from 'react'

const Loader = () => {
  return (
    <main className='mx-auto flex h-[70vh] flex-col justify-center items-center'>

        <div className="flex justify-center items-end gap-x-2">
            <div className="box first"></div>
            <div className="box second"></div>
            <div className="box third"></div>
        </div>
        <h2 className=' mt-5 text-center font-bold text-xl'>Loading...</h2>



        {/* <div className='rotating-div w-20 h-20 rounded-full border-4 border-black border-b-0 border-r-0'></div> */}
    </main>
  )
}

export default Loader