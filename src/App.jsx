import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircleLoader, ClipLoader } from "react-spinners"; // Import the spinner from react-spinners
import LandingPages from "./pages/landing/LandingPages";
import LoginForm from "./pages/Auth/LoginForm";
import { Books } from "./pages/home/Books";
import Courses from "./pages/home/Courses";
import Resources from "./pages/home/Resources";

import SchoolDashboard from "./pages/dashboard/school/Dashboard";
import StudentDashboard from "./pages/dashboard/student/Dashboard";
import StudentCourses from "./pages/dashboard/student/Courses";
import SavedCourses from "./pages/dashboard/student/SavedCourses";

import SchoolStudents from "./pages/dashboard/school/Students";
import NoticeStudents from "./pages/dashboard/school/notice/Notices";
import SingleResource from "./pages/home/SingleCource";
import CourseViewPage from "./pages/home/CourseViewPage";
import Subject from "./pages/dashboard/school/subject/Subject";

import SchoolResources from "./pages/dashboard/school/resources/Resources";

import Grade from "./pages/dashboard/school/grade/Grade";
import AddGrade from "./pages/dashboard/school/grade/AddGrade";
import UpdateGrade from "./pages/dashboard/school/grade/UpdateGrade";
import AddResources from "./pages/dashboard/school/resources/AddResources";
import AddSubject from "./pages/dashboard/school/subject/AddSubject";
import UpdateSubject from "./pages/dashboard/school/subject/UpdateSubject";
import Notices from "./pages/dashboard/school/notice/Notices";
import EditNotice from "./pages/dashboard/school/notice/EditNotice";
import SchoolProtectedRoute from "./protectedRoutes/SchoolProtectedRoute";
import StudentProtectedRoute from "./protectedRoutes/StudentProtectedRoute";
import SingleBook from "./pages/home/SingleBook";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import SchoolRegistrationForm from "./pages/Auth/SchoolRegistartionForm";
import StudentRegistrationForm from "./pages/Auth/StudentRegistartionForm";
import Addbook from "./pages/home/Addbook";
import Services from "./pages/landing/Services";
import ContactUs from "./pages/landing/ContactUs";
import { infiniteSpiner } from "./assets/images";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate 4 minutes (240000 ms) loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 4 minutes

    // Clean up timer in case the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-secondary items-center h-screen">
        <img src={infiniteSpiner} alt="" className="max-w-[100px]" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/school/register" element={<SchoolRegistrationForm />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/add-book" element={<Addbook />} />

        <Route element={<SchoolProtectedRoute />}>
          <Route path="/school/dashboard" element={<SchoolDashboard />} />

          {/* notice routes */}
          <Route path="/school/notices" element={<Notices />} />
          <Route path="/school/notices/edit/:id" element={<EditNotice />} />

          <Route path="/school/students" element={<SchoolStudents />} />

          {/* resources routes */}
          <Route path="/school/resources" element={<SchoolResources />} />
          <Route path="/school/resources/add" element={<AddResources />} />
          <Route path="/school/resources/edit/:id" element={<AddResources />} />

          {/* Grade Routes */}
          <Route path="/school/grades" element={<Grade />} />
          <Route path="/school/grades/add" element={<AddGrade />} />
          <Route path="/school/grades/edit/:id" element={<UpdateGrade />} />

          {/* subject routes */}
          <Route path="/school/subjects" element={<Subject />} />
          <Route path="/school/subjects/add" element={<AddSubject />} />
          <Route path="/school/subjects/edit/:id" element={<UpdateSubject />} />
        </Route>
        <Route element={<StudentProtectedRoute />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/saved" element={<SavedCourses />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/single/:id" element={<SingleBook />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<SingleResource />} />
          <Route path="/course/play/:id" element={<CourseViewPage />} />
          <Route path="/resources" element={<Resources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
