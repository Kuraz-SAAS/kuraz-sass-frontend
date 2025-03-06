import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@material-tailwind/react";
import { Loader2Icon } from "lucide-react";
import { useSiteStore } from "@/context/siteStore";
import Axios from "@/middleware/Axios";

const SignUp = ({toggleForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const setUser = useSiteStore((store) => store.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningIn(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      toast.error("Passwords do not match!");
      setIsSigningIn(false);
      return;
    }

    if (schoolName.trim() === "") {
      setErrorMessage("Please enter a unique name for your school.");
      toast.error("Please enter a unique name for your school.");
      setIsSigningIn(false);
      return;
    }

    try {
      await Axios.get("/sanctum/csrf-cookie");

      const payload = {
        name: schoolName,
        email,
        password,
        password_confirmation: confirmPassword,
      };

      const response = await Axios.post("/register", payload);

      if (response.status === 200 || response.status === 204) {
        setUser(response.data.user);
        toast.success("Registration successful!");

        if (response.data.user.user_type === "student") {
          navigate("/courses");
        } else {
          navigate("/school/dashboard");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data?.message.includes("domain_name")
      ) {
        setErrorMessage(
          "Unique school name is already taken. Please choose another."
        );
        toast.error("Unique school name is already taken.");
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
        <CardDescription className="text-xs font-light">
          Create an account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-light">School Name</label>
            <Input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-light">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-light">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-light">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button variant="outline" type="submit" disabled={isSigningIn}>
            {isSigningIn ? (
              <div className="flex gap-2 items-center">
                <Loader2Icon className="animate-spin" /> Registering...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="grid gap-5">
        <div className="flex justify-center">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={toggleForm}
              className="underline underline-offset-4 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
