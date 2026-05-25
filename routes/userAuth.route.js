import express from 'express';
import { Signup,Login,Logout } from '../controllers/auth.controller.js';
const AuthRouter = express.Router();


AuthRouter.post("/register",Signup);
AuthRouter.post("/login",Login);
AuthRouter.get("/logout",Logout);

export default AuthRouter;