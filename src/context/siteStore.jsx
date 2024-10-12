import { create } from "zustand";
import { persist } from "zustand/middleware";
import Axios from "../middleware/Axios";

const siteStore = (set, get) => ({
  courses: [],
  courseCategory: [],
  studentDashboard: null,
  user: {},

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
