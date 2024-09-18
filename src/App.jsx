import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPages from "./pages/landing/LandingPages";
import LoginForm from "./pages/Auth/LoginForm";
import RegistrationForm from "./pages/Auth/RegistartionForm";
import { Books } from "./pages/home/Books";
import Courses from "./pages/home/Courses";
import Resources from "./pages/home/Resources";
import SchoolDashboard from './pages/dashboard/school/Dashboard'
import StudentDashboard from './pages/dashboard/student/Dashboard'
import SchoolResources from './pages/dashboard/school/Resources'
import SchoolStudents from './pages/dashboard/school/Students'
import NoticeStudents from './pages/dashboard/school/Notices'

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

        <Route path='/school/dashboard' element={<SchoolDashboard/>}/>
        <Route path='/school/resources' element={<SchoolResources/>}/>
        <Route path='/school/students' element={<SchoolStudents/>}/>
        <Route path='/school/notices' element={<NoticeStudents/>}/>


        <Route path='/student/dashboard' element={<StudentDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
