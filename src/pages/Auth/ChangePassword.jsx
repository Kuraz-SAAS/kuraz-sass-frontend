import React, { useState } from "react";
import { heroTextShadow, kurazLogo } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../middleware/Axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await Axios.post("/api/resetPassword", {
        email,
        password,
        token,
        password_confirmation: confirmPassword,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Password changed successfully");
        navigate("/login");
      }
    } catch (err) {
      // Display error message using toastify
      toast.error(
        err.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
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
        <div className="left-side max-w-full lg:max-w-[500px] h-full relative flex-1">
          {/* Text Shadow Image */}
          <img
            className="absolute top-0 -left-10 lg:-left-14 hidden md:block"
            src={heroTextShadow}
            alt=""
          />

          <form className="grid gap-5 z-50 relative">
            {/* Heading and Subheading */}
            <h1 className="text-[20px] sm:text-[18px] md:text-[26px] font-bold leading-[70px] text-white">
              Change Password
            </h1>
            <p className="text-sm text-white">Enter your new password</p>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Confirm Password Input */}
            <input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              placeholder="Enter the token here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <button
              onClick={handleSubmit}
              className="mt-5 tracking-wide font-semibold shadow-lg bg-[#F3D598] text-black w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="ml-3">Change Password</span>
            </button>
          </form>
        </div>

        {/* Right Side */}
      </div>
    </div>
  );
};

export default ChangePassword;
