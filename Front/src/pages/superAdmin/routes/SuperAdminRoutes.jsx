import React from "react";
import { Routes, Route } from "react-router-dom";
import { UsuariosPage } from "../pages/usuarios/pages/UsuariosPage";
import { SideBar } from "../../../components/SideBar.jsx";
import { Footer } from "../../../components/Footer.jsx";

export const SuperAdminRoutes = () => {
  return (
    <div className="flex flex-col min-lg-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Contenido principal con flex-grow */}
        <div className="flex flex-col flex-1 ">
          {" "}
          <Routes>
            <Route path="/usuarios" element = {<UsuariosPage />} />

            {/* Profesores */}
            <Route path="/profesores" element = {<UsuariosPage />} />
          </Routes>
        </div>
      </div>

      {/* Footer pegado abajo */}
      <Footer />
    </div>
  );
};
