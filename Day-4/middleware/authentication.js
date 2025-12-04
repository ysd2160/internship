import jwt from 'jsonwebtoken'
export const authMiddleware = async(req,res,next)=>{

    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ',"") ||null
        
        
        if(!token){
           return  res.status(400).json({
                message:"user is not authorized",
                success:false,
            })
        }
       const decoded =  jwt.decode(token,"secret")
       req.user = decoded.user
       next()
       
    } catch (error) {
        console.log(error);
        
    }
}