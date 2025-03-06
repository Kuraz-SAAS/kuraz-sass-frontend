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
import { useSiteStore } from "@/context/siteStore";
import Axios from "@/middleware/Axios";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = ({toggleForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useSiteStore((store) => store.setUser);
  const user = useSiteStore((store) => store.user);

  useEffect(() => {
    if (user?.user_type === "student") {
      navigate("/courses");
    } else if (user?.user_type === "school") {
      navigate("/school/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      await Axios.get("/sanctum/csrf-cookie");
      const res = await Axios.post("login", { email, password });

      setUser(res.data.user);
      toast.success("Login successful!");

      navigate(
        res.data.user.user_type === "student" ? "/courses" : "/school/dashboard"
      );
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Sign In</CardTitle>
        <CardDescription className="text-xs font-light">
          Enter your details to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-light">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div>
            <label className="text-sm font-light">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <Loader2Icon className="animate-spin" /> Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
