import express from 'express';
import { CreateBlog, DeleteBlog, UpdateProfile } from '../controllers/blog.controller.js';
const BlogRouter = express.Router();
import upload from '../service/imageUpload.js';
import middleware from '../middleware/user.middleware.js';

BlogRouter.post("/create-blog", middleware, upload.single('coverImageURL'),CreateBlog);
BlogRouter.delete("/delete/:id", middleware, DeleteBlog);
BlogRouter.post("/update-profile", middleware, upload.single('profilePicture'), UpdateProfile);

export default BlogRouter;