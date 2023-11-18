import axios from 'axios';
import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// input tailwind css
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
    <section>
      <h2 className='text-center text-xl font-bold my-5'>BLOG DETAIL/EDIT</h2>

      <main className='flexCenter'> 

        <form className='border-2 w-full max-w-[600px] mx-4 px-6 py-12 flex flex-col items-center justify-center gap-y-4 rounded-xl shadow-2xl shadow-slate-400' onSubmit={handleSubmit}>
            <input className={inputCss} onChange={onChangeHandler} type="text" placeholder='title' value={inputs.title} name="title" required />
            {/* <input type="text"></input> */}
            <textarea rows='5' className={`${inputCss} min-h-[20vh]`}  onChange={onChangeHandler} type="text" placeholder='Discription' value={inputs.discription} name="discription" required/>
            <input className={inputCss} onChange={onChangeHandler} type="text" placeholder='Imgae URL' value={inputs.image} name="image" required/>
    
            <button className="p-2 border-black border-2 mt-6 hover:-translate-y-1 transition-all hover:scale-110 rounded-xl" type='submit'>Update</button>
        </form>
      </main>

    </section>
  )
}

export default BlogDetail