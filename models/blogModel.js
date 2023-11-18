import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    discription:{
        type:String,
        required:[true,"discription is required"]
    },
    img:{
        type:String,
        required:[true,"Imgae is required"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        require:true
    },
    tarikh:{
        type:String
    }
  },
    { timestamps: true }
);

const blogModel = new mongoose.model('blogs',blogSchema);
export default blogModel; 