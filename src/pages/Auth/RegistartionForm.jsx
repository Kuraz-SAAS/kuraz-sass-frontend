import React, { useEffect, useState, useRef } from "react";
import Axios from "../../middleware/Axios";
import { csrfCatch } from "../../middleware/utilities";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  // Form State
  const [userType, setUserType] = useState("student"); // Default to 'student'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Tenant Autocomplete State for 'student'
  const [tenants, setTenants] = useState([]);
  const [tenantInput, setTenantInput] = useState("");
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Tenant Input State for 'school'
  const [domainInput, setDomainInput] = useState("");

  // Error State
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  // Fetch Tenants on Component Mount
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

  // Handle Clicks Outside the Suggestions Dropdown
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

  // Handle Tenant Input Change for 'student'
  const handleTenantInputChange = (e) => {
    const input = e.target.value;
    setTenantInput(input);
    setSelectedTenant(null); // Reset selected tenant
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

  // Handle Tenant Selection from Suggestions for 'student'
  const handleTenantSelect = (tenant) => {
    setTenantInput(tenant.domain_name);
    setSelectedTenant(tenant);
    setFilteredTenants([]);
    setShowSuggestions(false);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Reset error message

    // Call the csrf catch
    csrfCatch();

    // Basic client-side validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (userType === "student" && !selectedTenant) {
      setErrorMessage("Please select a valid tenant from the suggestions.");
      return;
    }

    if (userType === "school" && domainInput.trim() === "") {
      setErrorMessage("Please enter a domain name for your school.");
      return;
    }

    // Prepare payload based on userType
    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      user_type: userType,
    };

    if (userType === "student") {
      payload.domain = selectedTenant.domain_name;
    } else if (userType === "school") {
      payload.domain = domainInput.trim();
    }

    try {
      const response = await Axios.post("/register", payload);

      if (response.status === 200 || response.status === 204) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific error for tenant name already taken
      if (
        error.response &&
        error.response.status === 409 && // Assuming 409 Conflict for duplicate tenant
        error.response.data &&
        error.response.data.message.includes("domain_name")
      ) {
        setErrorMessage("Domain name is already taken. Please choose another.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center font-poppins justify-center px-5 lg:px-0 bg-gray-50">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500">
                Enter your details to create your account
              </p>
            </div>
            <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                {/* Error Message */}
                {errorMessage && (
                  <div className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </div>
                )}

                {/* User Type Selection */}
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select User Type
                  </label>
                  <div className="flex space-x-4">
                    {/* User Types: Student, School */}
                    {["student", "school"].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center cursor-pointer ${
                          userType === type ? "text-blue-900" : "text-gray-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={type}
                          checked={userType === type}
                          onChange={() => {
                            setUserType(type);
                            setErrorMessage(""); // Reset error on user type change
                            // Reset tenant inputs when user type changes
                            setTenantInput("");
                            setSelectedTenant(null);
                            setDomainInput("");
                          }}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 capitalize">
                          {type === "student" ? "Student" : "School"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tenant Selection based on User Type */}
                {userType === "student" ? (
                  // Autocomplete Input for 'student'
                  <div className="relative">
                    <input
                      type="text"
                      id="tenant"
                      name="tenant"
                      value={tenantInput}
                      onChange={handleTenantInputChange}
                      onFocus={() => {
                        if (filteredTenants.length > 0)
                          setShowSuggestions(true);
                      }}
                      placeholder="Enter your domain name"
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
                            onClick={() => handleTenantSelect(tenant)}
                            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                          >
                            {tenant.domain_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Standard Input for 'school'
                  <div className="mt-4">
                    <input
                      type="text"
                      id="domain"
                      name="domain"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder="e.g., yourschooldomain"
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      required
                    />
                  </div>
                )}

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
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                  <a href="/login">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
