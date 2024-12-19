import axios from "axios";
import Cookies from "js-cookie"; // To handle cookies (install with `npm install js-cookie`)

// Create an Axios instance
const Axios = axios.create({
  baseURL: "http://localhost:8000/", // Your API base URL
  withCredentials: true, // Include cookies in requests (important for CSRF protection
});

// Request Interceptor
Axios.interceptors.request.use(
  (config) => {
    // Get the CSRF token from cookies
    const csrfToken = Cookies.get("XSRF-TOKEN"); // Replace with the actual cookie name if different
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken; // Add CSRF token to headers
      config.headers["CSRF-TOKEN"] = csrfToken; // Add CSRF token to headers
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
Axios.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response;
  },
  (error) => {
    // Handle response errors, like 401 Unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default Axios;
