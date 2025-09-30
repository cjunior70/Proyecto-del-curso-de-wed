import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Componentes/Footer";
import Principal from "./Pages/Principal/Principal";
import "./App.css";
import Header from "./Componentes/Header";
import Login from "./Pages/Login/Login";
import { AutenContextProvider } from "./Superbase/AutenContex";
import Cuenta from "./Pages/Cuenta/Cuenta.jsx";
import Work from "./Componentes/Work.jsx";
import Services from "./Componentes/Services.jsx";
import Boosted from "./Componentes/Boosted.jsx";
import Collections from "./Componentes/Collections.jsx";
import Liked from "./Componentes/Liked.jsx";
import About from "./Componentes/About.jsx";
import Subir from "./Pages/Subir/Subir.jsx";

// Layout controla Header/Footer
function Layout() {
  const location = useLocation();

  // Ocultar header y footer solo en /Login
  const path = location.pathname.toLowerCase();
  const hideLayout = path === "/login" || path === "/subir";

  return (
    <>
      <h1>holaaaaaaaaaa </h1>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
