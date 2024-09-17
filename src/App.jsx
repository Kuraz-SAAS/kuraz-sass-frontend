import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPages from "./pages/landing/LandingPages";
import LoginForm from "./pages/Auth/LoginForm";
import RegistrationForm from "./pages/Auth/RegistartionForm";
import { Books } from "./pages/home/Books";
import Courses from "./pages/home/Courses";
import Resources from "./pages/home/Resources";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
