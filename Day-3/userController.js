import bcrypt from 'bcrypt'
import { User } from './userModel.js'
import jwt from 'jsonwebtoken'
export const Register = async(req,res)=>{
    try {
        const {username,email,password}=req.body
        if(!username || !email || !password){
            return res.status(401).json({
                mmessage:"all fields are required",
                success:false
            })
        }
        const existingUser = await User.findOne({$or:[{username},{password}] })
        if(existingUser){
             return res.status(401).json({
                mmessage:"user already exists ",
                success:false
            }) 
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        return res.status(200).json({
            user,
            message:"User created successfully",
            success:true,
        })
    } catch (error) {
       console.log(error);
        
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "all field required",
                success: false
            })
        }
        const user = await User.findOne({ email })
        const safeUser = await User.findById(user._id).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "invalid user and password",
                success: false
            })
        }
        const token = jwt.sign({ user: user._id }, "secret",)
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",
            secure: false,
        });
        return res.status(200).json({
            user: safeUser,
            token,
            message: "login successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const logout = async (req, res) => {
    try {
       
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: "Strict",
        })
        return res.status(200).json({

            message: "logout successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const protectedRoute = async(req,res)=>{
    try {
        
        return res.json({
            message:"this routes accessible only after login"
        })
        
    } catch (error) {
        console.log(error);
        
    }
}