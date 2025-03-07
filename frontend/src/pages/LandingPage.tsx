import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-5xl font-bold">Welcome to Xipper</h1>
      <p className="text-lg text-gray-300 text-center max-w-md">
        Find and book the best hotels effortlessly with Xipper. Experience a seamless and
        hassle-free stay with our top-rated services.
      </p>
      <div className="flex space-x-4">
        <Button className="cursor-pointer" onClick={() => navigate("/register")}>
          Register
        </Button>
        <Button variant={"ghost"} className="cursor-pointer" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
