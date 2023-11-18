import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true, "Name is required"]
        },
        email:{
            type:String,
            required:[true, "Email is required"]
        },
        password:{
            type:String,
            required:[true, "Password is required"]
        },
        blogs:[
            {
                type:mongoose.Types.ObjectId,
                ref:'blogs',
            }
        ]
    },
    {
        timeSramp:true
    }
);

const userModel = mongoose.model("Users",userSchema);
export default userModel;