import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Componentes/Footer";
import Principal from "./Pages/Principal/Principal";
import "./App.css";
import Header from "./Componentes/Header";
import Login from "./Pages/Login/Login";
import { AutenContextProvider } from "./Superbase/AutenContex";

// Layout controla Header/Footer
function Layout() {
  const location = useLocation();

  // Ocultar header y footer solo en /Login
  const hideLayout = location.pathname.toLowerCase() === "/login";

  return (
    <>
      <AutenContextProvider>
        {!hideLayout && <Header />}

        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

        {!hideLayout && <Footer />}
      </AutenContextProvider>
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
