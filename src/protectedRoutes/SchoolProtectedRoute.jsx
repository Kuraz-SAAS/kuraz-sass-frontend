import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSiteStore } from "../context/siteStore";
import Cookies from "js-cookie";

const SchoolProtectedRoute = () => {
  let user = useSiteStore((store) => store.user);
  return user && user?.user_type?.toLowerCase() === "school" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

export default SchoolProtectedRoute;
