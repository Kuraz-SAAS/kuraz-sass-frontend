import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSiteStore } from "../context/siteStore";

const StudentProtectedRoute = () => {
  let user = useSiteStore((store) => store.user);
  return user && user?.user_type?.toLowerCase() === "student" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default StudentProtectedRoute;
