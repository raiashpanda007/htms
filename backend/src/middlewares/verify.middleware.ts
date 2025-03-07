import {asyncHandler} from '../utils/utils';
import jwt from 'jsonwebtoken';
interface DecodedToken {
    id:string;
    email:string;
}
const verifyUser = asyncHandler(async (req,res,next) =>{
    if(!req.cookies.authorization){
        return res.status(401).json({message:"Unauthorized"});
    }
    console.log("1")
    const token = req.cookies.authorization
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    console.log("2")
    if(!process.env.JWT_SECRET){
        return res.status(500).json({message:"Internal Server Error"});
    }
    console.log("3")
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log("4")
    req.user = decoded as DecodedToken;
    if(!decoded){
        return res.status(401).json({message:"Unauthorized"});
    }
    console.log("Passed middleware");
    next();
})


export default verifyUser;