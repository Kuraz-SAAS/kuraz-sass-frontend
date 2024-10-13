import React, { useState } from "react";
import {
  flower,
  heroBanner,
  heroImage,
  heroTextShadow,
  kurazLogo,
  shadow,
} from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../middleware/Axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("/api/forgotPassword", {
      email,
    }).then((res) => {
      console.log(res);
      navigate("/change-password");
    });
  };

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
      <div className="flex flex-col lg:flex-row items-center  justify-center px-4 md:px-16 lg:px-40 h-full relative">
        {/* Left Side */}
        <div className="left-side max-w-full lg:max-w-[500px] h-full pt-12 lg:pt-24 relative flex-1">
          {/* Text Shadow Image */}
          <img
            className="absolute top-0 -left-10 lg:-left-14 hidden md:block"
            src={heroTextShadow}
            alt=""
          />

          <form className="grid gap-5 z-50 relative">
            {/* Heading and Subheading */}
            <h1 className="text-[20px] sm:text-[18px] md:text-[26px] font-bold leading-[70px] text-white">
              Forgot Password?
            </h1>
            <p className="text-sm text-white">
              Enter your email address and we'll send you a password reset link.
            </p>
            <input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button
              onClick={handleSubmit}
              className="mt-5 tracking-wide font-semibold shadow-lg bg-[#F3D598] text-black w-full py-4 rounded-lg hover:bg-[#F3D598]/50 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="ml-3">Forget Password</span>
            </button>
          </form>
        </div>

        {/* Right Side */}
      </div>
    </div>
  );
};

export default ForgetPassword;
