import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// get all Users
export const getAllUsers = async (req,res) => {
    try{

        const allUsers = await userModel.find({});  
        return res.status(200).send({
            users_count:allUsers.length,
            success:true,
            msg:"All the users",
            allUsers
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"Error in Register Controller → ",
            err
        })
    }
    

}

// Register a user
export const registerController = async (req,res) => {
    try{
        // validation and existing user
        const {userName,email,password} = req.body;
        if(!userName || !email || !password){
            return res.status(400).json({
                success:false,
                msg:"All the fields are required"
            })
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                msg:"User already exists, please Login"
            })
        }
        // new user added to DB
        const hashedPass = await bcrypt.hash(password,10);
        const newUser = await new userModel({email,userName,password:hashedPass});
        newUser.save();
        return res.status(201).json({
            success:true,
            msg:"User Created, Please login",
            newUser
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"Error in Register Controller → ",
            err
        })
    }
}

// Login a user
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                msg:"Email and password needed",
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).json({
                success:false,
                msg:"Email not Registered",
            })
        }
        const correctPass = await bcrypt.compare(password,user.password);
        if(!correctPass){
            return res.status(200).json({    
                // status 401 not running
                success:false,
                msg:"Email or password not matched",
            })
        }
        return res.status(200).json({      
            success:true,
            msg:"Logged in successfuly",
            user
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"Error in Login Controller → ",
            err
        })
    }
}       