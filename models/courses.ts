import mongoose, { Document } from 'mongoose';

interface Course extends Document {
    title: string;
    description: string;
  }
const userSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required!'],
    },
    
    description:{
        type:String,
        required:[true,'Description is required!']
    },
},{timestamps:true})


module.exports = mongoose.model('Course',userSchema);