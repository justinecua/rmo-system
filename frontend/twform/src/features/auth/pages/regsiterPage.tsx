import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { REGISTER_URL, GET_USERTYPES } from "@/api/urls";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usertypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(null);

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Submitting register form...");

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      console.log("Sending data:", {
        email,
        password,
        first_name: firstname,
        last_name: lastname,
        username: firstname,
        user_type_id: selectedUserType?.user_type_id,
      });

      await axios.post(REGISTER_URL, {
        email,
        password,
        first_name: firstname,
        last_name: lastname,
        username: firstname,
        user_type_id: selectedUserType?.user_type_id,
      });

      toast.success("Registered successfully! Please log in.");
      nav("/login");
    } catch (err) {
      console.log("Error response:", err?.response?.data);
      const errorData = err?.response?.data;

      if (typeof errorData === "object") {
        const errorMessages = Object.values(errorData).flat().join("\n");
        toast.error(errorMessages || "Registration failed.");
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await axios.get(GET_USERTYPES);
        console.log(response);
        setUserTypes(response.data || []);
      } catch (err) {
        console.error("Failed to fetch usertypes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTypes();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4 py-6">
      <Card className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[28%]">
        <CardHeader>
          <CardTitle className="text-xl w-full text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-4">
              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-3" htmlFor="firstname">
                    First Name
                  </Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Your first name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="mb-3" htmlFor="lastname">
                    Last Name
                  </Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Your last name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label className="mb-3" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label className="mb-3" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <Label className="mb-3" htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* User Type Dropdown */}
              <div>
                <Label className="mb-3">User Type</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {selectedUserType?.name || "Select user type"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {usertypes.map((type) => (
                      <DropdownMenuItem
                        key={type.user_type_id}
                        onSelect={() => setSelectedUserType(type)}
                      >
                        {type.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 w-full bg-[#160e73] h-10"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
