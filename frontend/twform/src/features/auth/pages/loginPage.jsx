import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useAuth();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userType = await loginUser(username, password);
      if (userType) {
        if (userType.includes("Research")) {
          nav("/research/dashboard", { replace: true });
        } else {
          switch (userType) {
            case "Student":
              nav("/student/dashboard", { replace: true });
              break;
            case "Panel":
              nav("/panel/dashboard", { replace: true });
              break;
            case "Adviser":
              nav("/adviser/dashboard", { replace: true });
              break;
            case "Dean":
              nav("/dean/dashboard", { replace: true });
              break;
            default:
              toast("Unknown user type.");
              setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      const error = err?.response?.data?.error;

      console.log(error);
      if (error === "User not found.") {
        toast.error("User not found.");
      } else if (error === "Incorrect password.") {
        toast.error("Incorrect password.");
      } else {
        toast.error(error || "Something went wrong.");
      }

      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    nav("/");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-125 shadow-xl rounded-md overflow-hidden border-0 relative z-1 p-3">
        <div className="w-full flex justify-center pt-8">
          <div className="relative cursor-pointer" onClick={handleLogoClick}>
            <img
              src="../../../src/assets/images/Logo.jpg"
              alt="Logo"
              className="w-24 h-24 object-contain rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute -inset-2 rounded-full border-2 border-[#160e73] opacity-50"></div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-[#160e73]">
            SMCII RMO
          </CardTitle>
          <CardDescription className="text-center text-sm text-gray-600 font-medium">
            Fostering innovation and excellence in academic research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="py-2 px-3 border-gray-300 focus:border-[#160e73] focus:ring-2 focus:ring-[#160e73]/50 rounded-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="py-2 px-3 pr-10 border-gray-300 focus:border-[#160e73] focus:ring-2 focus:ring-[#160e73]/50 rounded-sm transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#160e73]"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#160e73] hover:bg-[#1a1185] h-11 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-[#160e73]/30"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <p className="text-xs text-gray-600 text-center font-medium">
            © {new Date().getFullYear()} SMCII Research Management Office. All
            rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
