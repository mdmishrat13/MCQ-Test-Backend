import mongoose, { Document } from 'mongoose';

interface Course extends Document {
    chapterName: string;
    userId:string,
    index: number;
  }
const userSchema =new mongoose.Schema({
    chapterName:{
        type:String,
        required:[true,'Chapter Name is required!'],
    },
    courseId: {
        type: String,
        required:[true,"Course is not valid"]
    },
    
    index:{
        type:Number,
        required:[true,'Index is not Found']
    },
},{timestamps:true})


module.exports = mongoose.model('Chapter',userSchema);