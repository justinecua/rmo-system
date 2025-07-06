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

const HomePage = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <p>Welcome user</p>
    </div>
  );
};

export default HomePage;
