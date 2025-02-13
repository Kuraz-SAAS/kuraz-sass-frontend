import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { infiniteSpiner } from "./assets/images";
import StudentLayout from "./layouts/students/StudentLayout";
import DashboardLayout from "./pages/layouts/dashboard/school/DashboardLayout";
import PhetPage from "./pages/home/PhetPage";
import SinglePhet from "./pages/home/SinglePhet";
import LandingPages from "./pages/landing/LandingPages";


const LoginForm = React.lazy(() => import("./pages/Auth/LoginForm"));
const Books = React.lazy(() => import("./pages/home/Books"));
const Courses = React.lazy(() => import("./pages/home/Courses"));
const Resources = React.lazy(() => import("./pages/home/Resources"));

const SchoolDashboard = React.lazy(() =>
  import("./pages/dashboard/school/Dashboard")
);
const StudentDashboard = React.lazy(() =>
  import("./pages/dashboard/student/Dashboard")
);
const StudentCourses = React.lazy(() =>
  import("./pages/dashboard/student/Courses")
);
const SavedCourses = React.lazy(() =>
  import("./pages/dashboard/student/SavedCourses")
);

const SchoolStudents = React.lazy(() =>
  import("./pages/dashboard/school/Students")
);
const NoticeStudents = React.lazy(() =>
  import("./pages/dashboard/school/notice/Notices")
);
const SingleResource = React.lazy(() => import("./pages/home/SingleCource"));
const CourseViewPage = React.lazy(() => import("./pages/home/CourseViewPage"));
const Subject = React.lazy(() =>
  import("./pages/dashboard/school/subject/Subject")
);

const SchoolResources = React.lazy(() =>
  import("./pages/dashboard/school/resources/Resources")
);
const Grade = React.lazy(() => import("./pages/dashboard/school/grade/Grade"));
const AddGrade = React.lazy(() =>
  import("./pages/dashboard/school/grade/AddGrade")
);
const UpdateGrade = React.lazy(() =>
  import("./pages/dashboard/school/grade/UpdateGrade")
);
const AddResources = React.lazy(() =>
  import("./pages/dashboard/school/resources/AddResources")
);
const AddSubject = React.lazy(() =>
  import("./pages/dashboard/school/subject/AddSubject")
);
const UpdateSubject = React.lazy(() =>
  import("./pages/dashboard/school/subject/UpdateSubject")
);
const Notices = React.lazy(() =>
  import("./pages/dashboard/school/notice/Notices")
);
const EditNotice = React.lazy(() =>
  import("./pages/dashboard/school/notice/EditNotice")
);
const SchoolProtectedRoute = React.lazy(() =>
  import("./protectedRoutes/SchoolProtectedRoute")
);
const StudentProtectedRoute = React.lazy(() =>
  import("./protectedRoutes/StudentProtectedRoute")
);
const SingleBook = React.lazy(() => import("./pages/home/SingleBook"));
const ForgetPassword = React.lazy(() => import("./pages/Auth/ForgetPassword"));
const ChangePassword = React.lazy(() => import("./pages/Auth/ChangePassword"));
const SchoolRegistrationForm = React.lazy(() =>
  import("./pages/Auth/SchoolRegistartionForm")
);
const StudentRegistrationForm = React.lazy(() =>
  import("./pages/Auth/StudentRegistartionForm")
);
const Addbook = React.lazy(() => import("./pages/home/Addbook"));
const Services = React.lazy(() => import("./pages/landing/Services"));
const ContactUs = React.lazy(() => import("./pages/landing/ContactUs"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center bg-secondary items-center h-screen">
    <img src={infiniteSpiner} alt="" className="max-w-[100px]" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
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
            <Route element={<DashboardLayout />}>
              <Route path="/school/dashboard" element={<SchoolDashboard />} />
              <Route path="/school/notices" element={<Notices />} />
              <Route path="/school/notices/edit/:id" element={<EditNotice />} />
              <Route path="/school/students" element={<SchoolStudents />} />
              <Route path="/school/resources" element={<SchoolResources />} />
              <Route path="/school/resources/add" element={<AddResources />} />
              <Route
                path="/school/resources/edit/:id"
                element={<AddResources />}
              />
              <Route path="/school/grades" element={<Grade />} />
              <Route path="/school/grades/add" element={<AddGrade />} />
              <Route path="/school/grades/edit/:id" element={<UpdateGrade />} />
              <Route path="/school/subjects" element={<Subject />} />
              <Route path="/school/subjects/add" element={<AddSubject />} />
              <Route
                path="/school/subjects/edit/:id"
                element={<UpdateSubject />}
              />
            </Route>
          </Route>

          <Route element={<StudentProtectedRoute />}>
            <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/courses" element={<StudentCourses />} />
              <Route path="/student/saved" element={<SavedCourses />} />
              <Route path="/books" element={<Books />} />
              <Route path="/phet" element={<PhetPage />} />
              <Route path="/books/single/:id" element={<SingleBook />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<SingleResource />} />
              <Route path="/phet/:id" element={<SinglePhet />} />
              <Route path="/course/play/:id" element={<CourseViewPage />} />
              <Route path="/resources" element={<Resources />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
