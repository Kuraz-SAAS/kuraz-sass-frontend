import React, { useEffect, useState } from "react";
import Axios from "../../middleware/Axios";
import { csrfCatch } from "../../middleware/utilities";
import { Link, useNavigate } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  flower,
  heroBanner,
  heroImage,
  heroTextShadow,
  kurazLogo,
  shadow,
} from "../../assets/images";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSiteStore((store) => store.setUser);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    await Axios.get("/sanctum/csrf-cookie").then(async (res) => {
      try {
        const res = await Axios.post("login", {
          email: email,
          password: password,
        });

        if (res.status === 204 || res.status === 200) {
          setUser(res.data.user);
          toast.success("Login successful!");
          navigate("/courses");
        }
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
      }
    });
  };

  const user = useSiteStore((store) => store.user);

  useEffect(() => {
    if (user && user.user_type === "student") {
      navigate("/courses");
    } else if (user && user.user_type === "school") {
      navigate("/school/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen bg-right bg-cover font-poppins relative overflow-hidden bg-secondary">
      <div className="flex flex-wrap items-center justify-between px-8 md:px-16 lg:px-32 relative">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/">
            <img src={kurazLogo} alt="Kuraz" className="logo w-24 md:w-full" />
          </a>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row items-center px-4 md:px-16 lg:px-40 h-full relative">
        {/* Left Side */}
        <div className="left-side max-w-full lg:max-w-[500px] h-full pt-12 lg:pt-24 relative flex-1">
          {/* Text Shadow Image */}
          <img
            className="absolute top-0 -left-10 lg:-left-14 hidden md:block"
            src={heroTextShadow}
            alt=""
          />
          {/* Text Content */}
          <div className="">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-[#F3D598]">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500">
                  Enter your details to access your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8 relative z-50">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="mt-5 tracking-wide font-semibold bg-[#F3D598] text-black w-full py-4 rounded-lg hover:bg-[#F3D598] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign In</span>
                    </button>
                    <div className="flex justify-end">
                      <Link to={"/forget-password"}>
                        <span className="text-[#F3D598] text-[12px] font-semibold">
                          Forget Password ?
                        </span>
                      </Link>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to="/school/register">
                      <span className="text-[#F3D598] font-semibold">
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-side flex-1 mt-8 lg:mt-0 hidden lg:flex">
          {/* Shadow and Flower Images */}
          <img
            className="absolute bottom-10 lg:bottom-20"
            src={shadow}
            alt=""
          />
          <img
            className="absolute bottom-[300px] md:bottom-[500px] -right-28 md:-right-56 z-40"
            src={shadow}
            alt=""
          />
          <img
            className="absolute bottom-[350px] md:bottom-[570px] right-0 w-[100px] md:w-[200px] z-50"
            src={flower}
            alt=""
          />
          <img
            className="absolute -bottom-[150px] md:-bottom-[250px] -right-28 md:-right-56 z-40"
            src={shadow}
            alt=""
          />
          {/* Main Hero Image */}
          <img
            src={heroImage}
            alt=""
            className="absolute top-0 right-0 md:-right-[100px] lg:-right-[220px] w-full max-w-[400px] md:max-w-[800px] lg:max-w-[1100px] z-30"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
