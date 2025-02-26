import { useState } from "react";
import { SideBar } from "./components/SideBar";
import { Footer } from "./components/Footer";
import { Prueba } from "./components/Prueba";

function App() {
  return (
    <div className="flex flex-col min-lg-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Contenido principal con flex-grow */}
        <div className="flex flex-col flex-1 ">
          {" "}
          <Prueba />{" "}
        </div>
      </div>

      {/* Footer pegado abajo */}
      <Footer />
    </div>
  );
}

export default App;
