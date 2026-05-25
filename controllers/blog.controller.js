import Blog from '../models/blog.model.js';
import User from '../models/user.model.js';


export const CreateBlog = async (req,res)=>{
    try{

        const {title,body,blogTopic} = req.body;
        if(!title || !body || !blogTopic){
            return res.render("AddBlog",{
                error:`Missing Title, Content, or Topic`,
                user: req.user
            });
        }

        // Ensure file is uploaded before accessing path
        if (!req.file || !req.file.path) {
            return res.render("AddBlog", {
                error: `Cover image is required`,
                user: req.user
            });
        }

        const coverImageURL = req.file.path;

        //store data
        const newBlog = await Blog.create({
            title,
            body,
            blogTopic,
            coverImageURL,
            createdBy:req.user.id
        });

        console.log(newBlog);
        res.redirect("/");

    }catch(err){
        console.log(`Error From Blog Creation: ${err}`);
        return res.render("AddBlog",{
            error: `Internal Server Error`,
            user: req.user
        })
    }
}

export const DeleteBlog = async (req,res)=>{
    try{
        const { id } = req.params;

        // Validate if ID is a valid MongoDB ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        // Find and check if blog exists
        const blog = await Blog.findById(id);
        
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Check if user owns this blog
        if (blog.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ error: "You don't have permission to delete this blog" });
        }

        // Delete the blog
        await Blog.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Blog deleted successfully" });

    }catch(err){
        console.log(`Error From Blog Deletion: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const UpdateProfile = async (req,res)=>{
    try{
        const { fullName } = req.body;
        const profilePicURL = req.file?.path;

        if(!fullName){
            return res.status(400).json({ error: "Name is required" });
        }

        const updateData = { fullName };
        
        if(profilePicURL){
            updateData.profilePicture = profilePicURL;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        );

        return res.status(200).json({ 
            success: true, 
            message: "Profile updated successfully",
            user: updatedUser
        });

    }catch(err){
        console.log(`Error From Profile Update: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}