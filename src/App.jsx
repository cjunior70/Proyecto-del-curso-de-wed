import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Componentes/Footer";
import Principal from "./Pages/Principal/Principal";
import './App.css'

function App() {
  return (
    <>
      {/* Etiqueta para usar las rutas con vite */}
      <Router>
        {/* Caja que abraza las rutas */}
        <Routes>
          <Route></Route>
        </Routes>

        {/* Cabeza de la interfaz */}
        <header>
          <nav></nav>
        </header>

        {/* Principal Interfaz */}
        <main></main>

        {/*Pie de pagina estatico */}
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
