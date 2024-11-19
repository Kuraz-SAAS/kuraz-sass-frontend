import React, { useState } from "react";
import {
  flower,
  heroImage,
  heroTextShadow,
  kurazLogo,
  shadow,
} from "../../assets/images";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="h-screen bg-right bg-primary font-poppins relative overflow-hidden">
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
              <Link to={"/"} className="hover:text-gray-300 cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/services"}
                className="hover:text-gray-300 cursor-pointer"
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className="hover:text-gray-300 cursor-pointer"
              >
                Contact Us
              </Link>
            </li>
          </ul>
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

          <div className="">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-[#F3D598]">
                  Contact Us
                </h1>
                <p className="text-sm text-gray-500">
                  Enter your details to access your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8 relative z-50">
                <div className="mx-auto  flex flex-col gap-4">
                  <form>
                    <div className="mb-6">
                      <input
                        type="text"
                        id="name"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        type="email"
                        id="email"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Your Email"
                      />
                    </div>

                    <div className="mb-6">
                      <textarea
                        id="message"
                        rows="4"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Your Message"
                      ></textarea>
                    </div>

                    <div>
                      <button className="mt-5 tracking-wide font-semibold bg-[#F3D598] text-black w-full py-4 rounded-lg hover:bg-[#F3D598] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <span className="ml-3">Send Message</span>
                      </button>
                    </div>
                  </form>
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

export default ContactUs;
