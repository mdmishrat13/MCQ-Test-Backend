import mongoose, { Document } from 'mongoose';

interface Question extends Document {
    chapterName: string;
    userId:string,
    index: number;
  }
const questionSchema =new mongoose.Schema({
    question:{
        type:String,
        required:[true,'Question Name is required!'],
    },
    options: {
        a: {
            type: String,
            required: true
        },
        b: {
            type: String,
            required: true
        },
        c: {
            type: String,
            required: true
        },
        d: {
            type: String,
            required: true
        }
    },
    // courseId: {
    //     type: String,
    //     required:[true,"Course id is not valid"]
    // },
    chapterId: {
        type: String,
        required:[true,"Chapter id is not valid "]
    },
    // userId: {
    //     type: String,
    //     required:[true,"Chapter id is not valid "]
    // },
    ans: {
        type: String,
        required:[true,"Chapter id is not valid"]
    },
    
    index:{
        type:Number,
        required:[true,'Index is not Found']
    },
},{timestamps:true})


module.exports = mongoose.model('Question',questionSchema);