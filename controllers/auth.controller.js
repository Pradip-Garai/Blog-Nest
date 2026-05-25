import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const Signup = async (req,res)=>{
    try{

        const {fullName,gender,email,password} = req.body;
        if(!fullName || !gender || !email || !password){
            return res.render("Signup",{
                error:`Missing Fields !!! All fields are required`
            });
        }

        if(password.length < 8){
            return res.render("Signup",{
                error:`Password Length should be minimum length 8 `
            });
        }
        // Check is email already exsist
        const user = await User.findOne({email});
        if(user){
            return res.render("Signup",{
                error:`User Already Registered!!!`
            });
        }

        // password encryption
        const hashPassword = await bcrypt.hash(password,10);

        // Create user
        const newUser = await User.create({
            fullName,
            gender,
            email,
            password:hashPassword
        });

        // generate token
        const token = jwt.sign(
            {id:newUser._id, email:newUser.email, name:newUser.fullName},
            process.env.JWT_SECRET,
        )

        return res.cookie("token",token).redirect("/");
    
    }catch(err){
        console.log(`Error from Signup: ${err}`);
        return res.render("Signup",{
            error:`Internal Server Error`
        });
    }
}

export const Login = async (req,res)=>{
    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.render("Login",{
                error:`Missing Email or Password !!!`
            });
        }

        // check user present or not
        const user = await User.findOne({email});
        if(!user){
            return res.render("Login",{
                error:`Invalid Email or Password !!!`
            });
        }

        // check password is correct or not 
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.render("Login",{
                error:`Invalid Email or Password !!!`
            });
        }

        // generate token
        const token = jwt.sign(
            {id:user._id, email:user.email, name:user.fullName},
            process.env.JWT_SECRET,
        )


        return res.cookie("token",token).redirect("/");

    }catch(err){
        console.log(`Error from Login: ${err}`);
        return res.render("Login",{
            error:`Internal Server Error`
        });
    }
}

export const Logout = async (req, res) => {
    try {

        // Clear token cookie
        res.clearCookie("token");

        // Redirect to login page
        return res.redirect("/login");

    } catch (err) {

        console.log(`Error from logout user: ${err}`);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}