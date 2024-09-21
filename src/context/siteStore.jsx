import { create } from "zustand";
import { persist } from "zustand/middleware";
import Axios from "../middleware/Axios";

const siteStore = (set, get) => ({
  courses: [],
  studentDashboard: null,
  user: {},
  setUser: (user) => set({ user }),
  getCourses: async () => {
    const res = await Axios.get("/api/courses");
    set({ courses: res.data.course });
  },
  getStudentDashboard: async () => {
    const res = await Axios.get(`/api/student/dashboard`);
    set({ studentDashboard: res.data });
  },
});

export const useSiteStore = create(
  persist(siteStore, {
    name: "site-store",
  })
);
