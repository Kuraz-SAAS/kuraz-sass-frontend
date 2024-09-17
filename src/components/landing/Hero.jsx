import React, { useState } from "react";
import {
  flower,
  heroBanner,
  heroImage,
  heroTextShadow,
  kurazLogo,
  shadow,
} from "../../assets/images";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="h-screen bg-right bg-cover font-poppins relative overflow-hidden"
      style={{
        backgroundImage: `url('${heroBanner}')`,
      }}
    >
      <div className="flex flex-wrap items-center justify-between px-8 md:px-16 lg:px-32 relative">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/">
            <img src={kurazLogo} alt="Kuraz" className="logo w-24 md:w-full" />
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            id="menu-button"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {/* Hamburger icon (three horizontal lines) */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          id="menu"
          className={`${
            menuOpen ? "" : "hidden"
          } md:flex md:items-center md:gap-8 z-50 lg:gap-16 absolute md:relative w-full md:w-auto top-16 md:top-0 left-0 bg-gray-800 md:bg-transparent`}
        >
          <ul className="text-[16px] md:text-[18px] lg:text-[20px] text-white flex flex-col md:flex-row md:gap-8 lg:gap-16 py-4 md:py-0 px-8 md:px-0">
            <li>
              <a href="#" className="hover:text-gray-300 cursor-pointer">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 cursor-pointer">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 cursor-pointer">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Sign Up Button */}
        <div className="mt-4 md:mt-0">
          <button className="text-[16px] md:text-[18px] relative z-50 lg:text-[20px] bg-gray-50 text-gray-800 hover:bg-[#F3D598] rounded-lg px-6 md:px-8 lg:px-16 py-2 transition duration-300">
            Sign up
          </button>
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
          <div className="flex flex-col gap-5 px-4 md:px-0">
            <p className="text-[28px] sm:text-[36px] md:text-[56px] lg:text-[76px] leading-[70px] text-white">
              <span className="font-[100] text-[24px] sm:text-[28px] md:text-[48px] lg:text-[64px]">
                Enabling
              </span>
              <br />
              <span className="font-light text-[28px] sm:text-[36px] md:text-[48px]">
                the Future
              </span>
              <br />
              <span className="font-semibold text-[#F3D598] text-[36px] sm:text-[44px] md:text-[56px] lg:text-[76px]">
                Generation
              </span>
            </p>
            <p className="text-[16px] md:text-[18px] font-light text-white">
              Dynamic and inclusive platform nurturing the minds of tomorrow.
            </p>
            {/* Flower Image on Smaller Screens */}
            <img
              className="absolute -bottom-[240px] hidden lg:block z-50"
              src="./Frontend/assets/images/flower.svg"
              alt=""
            />
            {/* Button */}
            <div>
              <button className="text-[20px] md:text-[24px] lg:text-[28px] text-white font-semibold bg-gradient-to-r relative z-50 from-[#F3D598]/80 to-[#242838] px-6 md:px-8 lg:px-10 py-2 rounded-3xl">
                Learn more
              </button>
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

export default Hero;
