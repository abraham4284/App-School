import React from "react";
import { Routes, Route } from "react-router-dom";
import { SuperAdminRoutes } from "../pages/superAdmin/routes/SuperAdminRoutes";
import { LoginPage } from "../home/pages/LoginPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/superAdmin/*" element={<SuperAdminRoutes />} />
    </Routes>
  );
};
