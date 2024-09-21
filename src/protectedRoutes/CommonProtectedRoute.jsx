import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSiteStore } from "../context/siteStore";

const CommonProtectedRoute = () => {
  let user = useSiteStore((store) => store.user);
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default CommonProtectedRoute;
