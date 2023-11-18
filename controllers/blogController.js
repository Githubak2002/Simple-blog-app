import mongoose from "mongoose";
import blogModel from "../models/blogModel.js"
import userModel from "../models/userModel.js";

// getting all the blogs
export const getAllBlogs = async (req,res) => {
    try{
        const blogs = await blogModel.find({}).populate("user");
        if(blogs.length === 0){
            return res.status(200).json({
                success:true,
                msg:"No BLOGS found. Create Or Post a NEW blog.",
            })
        }
        return res.status(200).json({
            blogs_count:blogs.length,
            success:true,
            blogs
        });
    }
    catch(err){
        return res.status(400).json({
            success:false,
            msg:"Error from get all blogs controller",
            err
        })
    }
}

// creating or posting a new blog
export const createBlog = async (req,res) => {

    // == getting the current date and time == 
    const currentDate = new Date();
    // Format the date
    const options = { year: 'numeric', month: 'long',day: 'numeric', hour: '2-digit',minute: '2-digit'};
    const formattedDate = currentDate.toLocaleString('en-US', options);
    console.log(formattedDate);
    console.log(typeof(formattedDate));
    try{
        const {title,discription,img,user} = req.body;
        if(!title || !discription || !img || !user){
            return res.status(400).json({
                success:false,
                msg:"All the fields are required",
            })
        }
        const existingUser = await userModel.findById(user);
        if(!existingUser){
            return res.status(404).json({
                success:flase,
                msg:"unable to find user",
            })
        }
        
        // tarikh = formattedDate;
        const newBlog = await blogModel.create({title,discription,img,user,tarikh:formattedDate});

        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        
        return res.status(201).json({
            success:true,
            msg:"Posted a new blog.",
            newBlog
        })
    }
    catch(err){
        // console.log("Error from create a new blog controller ",err);
        return res.status(400).json({
            success:false,
            msg:"Error from create a new blog controller",
            err
        })
    }
    
}

// updating a blog
export const updateBlog = async (req,res) => {
    try{
        const {id} = req.params;
        const {title,discription,img} = req.body;
        const updatedBlog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(201).json({
            success:true,
            msg:"Blog Updated.",
            updateBlog
        });
    }
    catch(err){
        return res.status(400).json({
            success:false,
            msg:"Error in update a blogs controller",
            err
        })
    }
    
}

// deleting a blog
export const deleteBlog = async (req,res) => {
    try{
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        // console.log(user);
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).json({
            success:true,
            msg:"Blog deleted"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            msg:"Error in delete a blogs controller",
            err
        })
    }
}

// getting a single blog
export const getBlog = async (req,res) => {
    try{
        const blog = await blogModel.findById(req.params.id);
        const user = await userModel.findById(blog.user);
        return res.status(200).json({
            success:true,msg:"Fetched a blog by id",
            blog,
            name:user.userName
        })
    }
    catch(err){
        console.log("Error in get a blog controller → ",err);
        return res.status(400).json({
            success:false,
            msg:"Error in get a blog controller → ",
            err
        })
    }
}

export const userBlogs = async (req,res) => {
    try{
        const u_Blogs = await userModel.findById(req.params.id).populate("blogs");
        if(!u_Blogs){
            return res.status(404).json({
                success:false,
                msg:"Blogs not found for the id provided",
            })
        }
        return res.status(200).json({
            success:true,
            msg:"User Blogs",
            u_Blogs
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            msg:"Error in getting blogs of a user controller",
            err
        })
    }
}