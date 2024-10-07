import React, { useState } from "react";
import { heroBanner, kurazLogo } from "../../assets/images";
import { Link } from "react-router-dom";

const Service = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="h-full bg-right bg-cover font-poppins"
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
          } md:flex md:items-center md:gap-8 z-50 lg:gap-16 absolute md:relative w-full md:w-auto top-16 md:top-0 left-0 bg-black bg-opacity-70 md:bg-transparent`}
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

      <div className="min-h-screen text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-[#F3D598] text-center mb-8 leading-tight">
            Empower Your School with the Ultimate Learning Management Platform
          </h1>

          <p className="text-lg text-center mb-12 max-w-3xl  mx-auto text-gray-200">
            At <span className="font-bold">Kuraztech</span>, we provide schools
            with a comprehensive solution to manage resources, empower students,
            and conduct seamless examinations.
          </p>

          {/* Services Section */}
          <div className="grid lg:grid-cols-2 gap-5">
            <ServiceSection
              title="1. Resource Management Made Easy"
              description="With our platform, schools can organize, store, and distribute all their learning materials in one central hub."
              features={[
                "Exam Worksheets",
                "Books & E-books",
                "Multimedia Resources",
                "Custom Resources",
              ]}
            />

            <ServiceSection
              title="2. Skill-Building Content for Students"
              description="Our platform comes equipped with a vast library of curated content designed to help students upscale their skills."
              features={[
                "Interactive Lessons",
                "Skill-Based Learning Paths",
                "Quizzes & Challenges",
              ]}
            />

            <ServiceSection
              title="3. Seamless Exam Management"
              description="Conducting exams has never been more efficient. We provide a secure way to administer online and offline assessments."
              features={[
                "Create Exams",
                "Automated Grading",
                "Student Progress Tracking",
                "Proctored Exams",
              ]}
            />

            <ServiceSection
              title="4. Advanced Reporting & Analytics"
              description="Gain insights into student performance and resource usage with our comprehensive reporting tools."
              features={[
                "Performance Reports",
                "Resource Analytics",
                "Custom Dashboards",
              ]}
            />
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-[#423E37] to-[#767474] py-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Start Transforming Education Today
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Equip your school with the tools to deliver exceptional learning
              experiences.
            </p>
            <button className="bg-gradient-to-r from-[#423E37] to-green-600 text-white font-semibold py-2 px-6 rounded-md hover:scale-105 transition-transform duration-300 shadow-md">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = ({ title, description, features }) => (
  <div className="p-8 bg-[#423E37] shadow-lg rounded-lg transition hover:shadow-2xl transform hover:scale-[1.02] duration-300">
    <h3 className="text-2xl font-bold text-[#F3D598] mb-4">{title}</h3>
    <p className="text-lg text-[#F3D598] mb-6">{description}</p>
    <ul className="list-disc list-inside space-y-2 text-[#F3D598]">
      {features.map((feature, index) => (
        <li key={index} className="text-lg">
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default Service;
