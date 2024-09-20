import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPages from "./pages/landing/LandingPages";
import LoginForm from "./pages/Auth/LoginForm";
import RegistrationForm from "./pages/Auth/RegistartionForm";
import { Books } from "./pages/home/Books";
import Courses from "./pages/home/Courses";
import Resources from "./pages/home/Resources";

import SchoolDashboard from "./pages/dashboard/school/Dashboard";
import StudentDashboard from "./pages/dashboard/student/Dashboard";
import SchoolStudents from "./pages/dashboard/school/Students";
import NoticeStudents from "./pages/dashboard/school/Notices";
import SingleResource from "./pages/home/SingleCource";
import CourseViewPage from "./pages/home/CourseViewPage";
import Subject from "./pages/dashboard/school/Subject";

import SchoolResources from "./pages/dashboard/school/resources/Resources";

import Grade from "./pages/dashboard/school/grade/Grade";
import AddGrade from "./pages/dashboard/school/grade/AddGrade";
import UpdateGrade from "./pages/dashboard/school/grade/UpdateGrade";
import AddResources from "./pages/dashboard/school/resources/AddResources";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/books" element={<Books />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<SingleResource />} />
        <Route path="/courses/view" element={<CourseViewPage />} />
        <Route path="/resources" element={<Resources />} />

        <Route path="/school/dashboard" element={<SchoolDashboard />} />
        <Route path="/school/students" element={<SchoolStudents />} />
        <Route path="/school/notices" element={<NoticeStudents />} />

        {/* resources routes */}
        <Route path="/school/resources" element={<SchoolResources />} />
        <Route path="/school/resources/add" element={<AddResources />} />

        {/* Grade Routes */}
        <Route path="/school/grades" element={<Grade />} />
        <Route path="/school/grades/add" element={<AddGrade />} />
        <Route path="/school/grades/edit/:id" element={<UpdateGrade />} />

        <Route path="/school/subjects" element={<Subject />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
