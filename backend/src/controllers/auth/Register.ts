import {asyncHandler,response} from "../../utils/utils";
import {z as zod} from "zod";
import { PrismaClient } from "@prisma/client";
const zodSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
});
import bcrypt from "bcrypt";
import loginFunction from "./LoginFunction";
const prisma = new PrismaClient();
const Register = asyncHandler(async (req,res) =>{
    const body = req.body;
    const result = zodSchema.safeParse(body);
    if(!result.success){
        return res.status(400).json(new response(400,"Bad Request",result.error));
    }
    const {email,password} = result.data;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if(user){
            return res.status(400).json(new response(400,"User already exists",{}));
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data:{
                email: email,
                password: hashedPassword
            }
        })

        const loginUser = await loginFunction(email,password);
        if(!loginUser.data){
            return res.status(loginUser.statusCode).json(new response(loginUser.statusCode,loginUser.message,null));
        }
        const options = {
            httpOnly: true,
            secure: true,
        }
        console.log("Successfully registered");
        return res.status(loginUser.statusCode).cookie("authorization",loginUser.data,options).json(new response(200,"Successfully registered",{}));
    } catch (error) {
        return res.status(500).json(new response(500,"Internal Server Error",{error}));
    }
    

})
export default Register;