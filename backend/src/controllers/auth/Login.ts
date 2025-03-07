import asyncHandler from "../../utils/asyncHandler";
import response from "../../utils/response";
import { z as zod } from "zod";
import LoginFunction from "./LoginFunction";
const zodSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
});
const login = asyncHandler(async (req, res) => {
    const body = req.body;
    const result = zodSchema.safeParse(body);
    if (!result.success) {
        return res.status(400).json(new response(400, "Bad Request", result.error));
    }
    const { email, password } = result.data;
    const loginResponse = await LoginFunction(email, password);
    if(!loginResponse.data){
        return res.status(loginResponse.statusCode).json(new response(loginResponse.statusCode,loginResponse.message,null));
    }
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("authorization", loginResponse.data, options).json(new response(200, "Success", {}))
})

export default login;