import React, { useEffect, useState, useRef } from "react";
import Axios from "../../middleware/Axios";
import { csrfCatch } from "../../middleware/utilities";
import { Link, useNavigate } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";
import { toast } from "react-toastify";
import {
  flower,
  heroBanner,
  heroImage,
  kurazLogo,
  shadow,
} from "../../assets/images";

const StudentRegistrationForm = () => {
  const [userType, setUserType] = useState("student"); // Default to 'student'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [tenants, setTenants] = useState([]);
  const [schoolInput, setSchoolInput] = useState("");
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const setUser = useSiteStore((store) => store.setUser);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await Axios.get("/api/tenants");
        setTenants(res.data.tenants);
      } catch (error) {
        console.error("Error fetching tenants:", error);
        setErrorMessage("Failed to load tenants. Please try again later.");
      }
    };
    fetchTenants();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSchoolInputChange = (e) => {
    const input = e.target.value;
    setSchoolInput(input);
    setSelectedTenant(null);
    if (input.length > 0) {
      const filtered = tenants.filter((tenant) =>
        tenant.domain_name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredTenants(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredTenants([]);
      setShowSuggestions(false);
    }
  };

  const handleSchoolSelect = (tenant) => {
    setSchoolInput(tenant.domain_name);
    setSelectedTenant(tenant);
    setFilteredTenants([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }

    if (userType === "student" && !selectedTenant) {
      setErrorMessage(
        "Your school name does exist in our database please contact your school for a correct school name."
      );
      toast.error("Please enter a correct school name.");
      return;
    }

    if (schoolInput.trim() === "") {
      setErrorMessage("Please enter a unique name for your school.");
      toast.error("Please enter a unique name for your school.");
      return;
    }

    await Axios.get("/sanctum/csrf-cookie").then(async (res) => {
      const payload = {
        school_name: name,
        name: schoolInput,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        user_type: "student",
      };

      try {
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
          error.response.data &&
          error.response.data.message.includes("domain_name")
        ) {
          setErrorMessage(
            "unique school name is already taken. Please choose another."
          );
          toast.error("unque school name is already taken.");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          setErrorMessage("Registration failed. Please try again.");
          toast.error("Registration failed. Please try again.");
        }
      }
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
        <div className="z-50 relative">
          <Link
            to={"/school/register"}
            className="bg-white p-2 shadow-lg rounded-md"
          >
            Register as a school
          </Link>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex justify-center w-full px-4 md:px-16 lg:px-40 h-full relative">
        <div className="w-[400px]">
          <div className="flex flex-col gap-3 items-center">
            <div className="text-center grid gap-3">
              <p className="text-[25px] font-bold text-white underline underline-offset-2 z-50">
                Registration form for students
              </p>
              <h1 className="text-2xl xl:text-4xl font-extrabold text-[#F3D598]">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500">
                Enter your details to create your account
              </p>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className=" flex flex-col gap-4">
                {/* Error Message */}
                {errorMessage && (
                  <div className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </div>
                )}
                {/* Tenant Selection based on User Type */}
                {/* // Autocomplete Input for 'student' */}
                <div className="relative">
                  <input
                    type="text"
                    id="tenant"
                    name="tenant"
                    value={schoolInput}
                    onChange={handleSchoolInputChange}
                    onFocus={() => {
                      if (filteredTenants.length > 0) setShowSuggestions(true);
                    }}
                    placeholder="Enter your unique identity school name"
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    autoComplete="off"
                    required
                  />
                  {showSuggestions && filteredTenants.length > 0 && (
                    <ul
                      ref={suggestionsRef}
                      className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg"
                    >
                      {filteredTenants.map((tenant) => (
                        <li
                          key={tenant.tenant_id}
                          onClick={() => handleSchoolSelect(tenant)}
                          className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                        >
                          {tenant.domain_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Name Input */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
                {/* Email Input */}
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                {/* Password Input */}
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
                {/* User Type-Based Tenant Selection */}
                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-[#F3D598] text-black w-full py-4 rounded-lg hover:bg-[#F3D598]/50 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                  <span className="ml-3">Sign Up</span>
                </button>
                {/* Redirect to Login */}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-[#F3D598] font-semibold">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </form>
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

export default StudentRegistrationForm;
