import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const HomePage = async  (req,res)=>{
    const allBlogs = await Blog.find({}).populate('createdBy', 'fullName email profilePicture');
    return res.render("Home",{
        user:req.user,
        currentPage:"home",
        blogs:allBlogs
    });
}

export const SignupPage = (req,res)=>{
    return res.render("Signup");
}

export const LoginPage = (req,res)=>{
    return res.render("Login");
}

export const AddBlogPage = (req,res)=>{
    return res.render("AddBlog",{
        user:req.user,
        currentPage:"add-blog"
    });
}

export const ReadBlogPage = async (req,res)=>{
    try {
        // Validate if ID is a valid MongoDB ObjectId format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).render("Home", {
                user: req.user,
                currentPage: "home",
                blogs: [],
                error: "Invalid blog ID"
            });
        }

        const blog = await Blog.findById(req.params.id).populate('createdBy', 'fullName email profilePicture');
        
        if (!blog) {
            return res.status(404).render("Home", {
                user: req.user,
                currentPage: "home",
                blogs: [],
                error: "Blog not found"
            });
        }

        return res.render("Blog", {
            user: req.user,
            blog: blog
        });
    } catch (err) {
        console.log(`Error reading blog: ${err}`);
        return res.status(500).render("Home", {
            user: req.user,
            currentPage: "home",
            blogs: [],
            error: "Error loading blog"
        });
    }
}

export const MyBlogsPage = async (req,res)=>{
    try{
        const myBlogs = await Blog.find({createdBy:req.user.id}).populate('createdBy', 'fullName email profilePicture');    
        return res.render("MyBlogs",{
            user:req.user,
            currentPage:"my-blogs",
            blogs:myBlogs
        });
    }catch(err){
        console.log(`Error fetching user's blogs: ${err}`);
        return res.status(500).render("MyBlogs",{   
            user:req.user,
            currentPage:"my-blogs",
            blogs:[],
            error:"Error loading your blogs"
        }); 
    }
}

export const ProfilePage = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        const blogCount = await Blog.countDocuments({createdBy:req.user.id});
        
        return res.render("Profile",{
            user:req.user,
            currentPage:"profile",
            blogCount:blogCount,
            userDetails:user
        });
    }catch(err){
        console.log(`Error fetching profile: ${err}`);
        return res.status(500).render("Profile",{   
            user:req.user,
            currentPage:"profile",
            blogCount:0,
            userDetails:{},
            error:"Error loading profile"
        }); 
    }
}