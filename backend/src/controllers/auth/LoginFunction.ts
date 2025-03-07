import response from "../../utils/response"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
const loginFunction = async (email: string, password: string) => {
    if (!process.env.JWT_SECRET) {
        return new response(500, "Internal Server Error", {})
    }
    if (!email || !password) {
        return new response(400, "Please enter username and password", {})
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            return new response(400, "User not found", {})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return new response(400, "Invalid password", {})
        }
        const token = jwt.sign({ id: user.id,email }, process.env.JWT_SECRET)
        console.log("Logged in successfully")
        return new response(200, "Login successful",token)


    } catch (error) {
        return new response(500, "Internal Server Error", {})

    }

}


export default loginFunction