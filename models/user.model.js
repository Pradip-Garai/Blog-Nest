import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },

    gender:{
       type:String,
       required:true,
       enum:['male', 'female', 'other'],
       default:undefined
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        minlength:8,
    },

    profilePicture:{
        type:String,
        default:'./Profile_Avatar.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},{ timestamps:true });

const User = mongoose.model("users",userSchema);

export default User;