import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    blogTopic:{
        type:String,
        enum:["Technology","Jobs","Geopolitics","Lifestyle","Travel & Tour","Nature","Food","Education","Health","Finance","AI","Entertainment","Sports","Cooking","Other"],
        default:"Other",
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{ timestamps:true });

const Blog = mongoose.model("blogs",blogSchema);


export default Blog;