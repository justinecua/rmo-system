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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userType = await loginUser(email, password);

    if (userType) {
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
        case "Research Staff":
          nav("/rmo_staff/dashboard", { replace: true });
          break;
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl w-full text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="input your smc email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  placeholder="input your password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full bg-[#4199fe] h-10">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
