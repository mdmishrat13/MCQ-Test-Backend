import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string
  }
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required!'],
    },
    
    email:{
        type:String,
        required:[true,'Email is required!']
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})


module.exports = mongoose.model('User',userSchema);