import express from 'express';
import { HomePage,SignupPage,LoginPage,AddBlogPage,ReadBlogPage,MyBlogsPage,ProfilePage } from '../controllers/staticpages.controller.js';
import middleware from '../middleware/user.middleware.js';
const StaticPage = express.Router();


StaticPage.get("/",middleware,HomePage);
StaticPage.get("/signup",SignupPage);
StaticPage.get("/login",LoginPage);
StaticPage.get("/add-blog",middleware,AddBlogPage);
StaticPage.get("/blog/:id",middleware,ReadBlogPage);
StaticPage.get("/my-blogs",middleware,MyBlogsPage);
StaticPage.get("/profile",middleware,ProfilePage);

export default StaticPage;