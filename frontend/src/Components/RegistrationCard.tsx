import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        { email, password },
        { withCredentials: true }
      );

      console.log("Registration Successful", response.data);

      if (response.data.success === false) {
        setError(response.data.message || "Registration failed.");
      } else {
        setSuccess("Registration successful! You can now log in.");
        navigate("/hotel-search");
        
      }

    } catch (err: any) {
      // Extract server error message if available
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="border p-5 w-full max-w-md rounded-2xl flex flex-col justify-between items-center shadow-lg mx-4 sm:mx-auto">
      <h1 className="text-4xl font-semibold text-center">REGISTER</h1>
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

        <div>
          <Label className="text-lg font-semibold">Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2 text-center">{success}</p>}

        <div className="flex justify-end">
          <Button className="w-full sm:w-1/3 font-semibold cursor-pointer">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCard;
