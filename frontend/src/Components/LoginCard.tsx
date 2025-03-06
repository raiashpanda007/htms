import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { setLogin } from "@/store/Login";
import { useDispatch } from "react-redux";

function LoginCard() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password },{withCredentials:true});
        dispatch(setLogin("true"));
      console.log("Login Successful", response.data);
      
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="border p-5 w-full max-w-md rounded-2xl flex flex-col justify-between items-center shadow-lg mx-4 sm:mx-auto">
      <h1 className="text-4xl font-semibold text-center">LOGIN</h1>
      <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label className="text-lg font-semibold">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-lg font-semibold">Password</Label>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <div className="flex justify-end">
          <Button className="w-full sm:w-1/3 font-semibold cursor-pointer">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginCard;
