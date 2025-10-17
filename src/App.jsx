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
import Editar from "./Pages/Editar/Editar.jsx";
import Buscar from "./Pages/Buscar/Buscar.jsx";
import Account from "./Pages/Account/Account.jsx";

// Layout controla Header/Footer
function Layout() {
  const location = useLocation();

  // Ocultar header y footer solo en /Login
  const path = location.pathname.toLowerCase();
  const hideLayout = path === "/login" || path === "/subir" || path === "/editar";

  return (
    <>
      <AutenContextProvider>
        {!hideLayout && <Header />}

        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Buscar" element={<Buscar/>} />
          <Route path="/Cuenta/" element={<Cuenta />} >
            <Route path="Work/" element={<Work />} />
            <Route path="Services" element={<Services/>} />
            <Route path="Boosted" element={<Boosted/>} />
            <Route path="Collections" element={<Collections/>} />
            <Route path="Liked" element={<Liked/>} />
            <Route path="About" element={<About/>} />
          </Route>
          <Route path="/Account/" element={<Account />}>
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
            <Route path="Work/" element={<Work />} />
          </Route>
          <Route path="/Editar" element={<Editar/>}/>
          <Route path="/Subir" element={ <Subir></Subir> } ></Route>
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
