import bcrypt from 'bcrypt'
import { User } from './userModel.js'
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