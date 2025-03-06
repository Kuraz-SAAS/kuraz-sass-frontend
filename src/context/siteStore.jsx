import { create } from "zustand";
import { persist } from "zustand/middleware";
import Axios from "../middleware/Axios";

const siteStore = (set, get) => ({
  courses: [],
  courseCategory: [],
  studentDashboard: null,
  bookCategory: [],
  user: {},
  books: [],
  schoolGrades: [],
  schoolDashboard: {},
  schoolStudents: [],
  schoolSubject: [],
  schoolResources: [],
  schoolNotice: [],

  setSchoolNotice: async () => {
    const res = await Axios.get("/api/schoolNotices");
    set({ schoolNotice: res.data.notices });
  },

  setSchoolResources: async () => {
    const res = await Axios.get("/api/schoolResources");
    set({ schoolResources: res.data.school_resources });
  },

  setSchoolStudents: async () => {
    const res = await Axios.get("/api/tenant/admin/students");
    set({ schoolStudents: res.data.students });
  },

  setSchoolSubjects: async () => {
    const res = await Axios.get("/api/schoolSubjects");
    set({ schoolSubject: res.data.school_subjects });
  },
  setSchoolDashboard: async () => {
    const res = await Axios.get("api/tenant/admin/dashboard");
    set({ schoolDashboard: res.data });
  },

  setBooks: async () => {
    const res = await Axios.get("/api/books");
    set({ books: res.data.books });
    set({ bookCategory: res.data.book_category });
  },

  setSchoolGrades: async () => {
    const res = await Axios.get("/api/schoolGrades");
    set({ schoolGrades: res.data.school_grades });
  },

  // Set user information
  setUser: (user) => set({ user }),

  // Fetch courses and set them in the store
  getCourses: async () => {
    const res = await Axios.get("/api/courses");
    set({ courses: res.data.course });
    set({ courseCategory: res.data.course_category });
  },

  // Fetch student dashboard data
  getStudentDashboard: async () => {
    const res = await Axios.get(`/api/student/dashboard`);
    set({ studentDashboard: res.data });
  },

  // Toggle favorite status of a course
  toggleFavorite: (courseId) => {
    set((state) => {
      const updatedCourses = state.courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            isFavorite: course.isFavorite === 1 ? 0 : 1,
          };
        }
        return course;
      });

      return { courses: updatedCourses };
    });
  },
});

export const useSiteStore = create(
  persist(siteStore, {
    name: "site-store",
  })
);
