import mongoose from "mongoose";
export const connectDb = async()=>{
    try {
        const res = await mongoose.connect("mongodb://localhost:27017/test")
        console.log('database connected successfully');
        
    } catch (error) {
        console.log("connection error:",error);
        
    }
}