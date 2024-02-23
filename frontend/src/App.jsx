import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import Registrar from "./pages/Registrar";
import NuevoPassword from "./pages/NuevoPassword";
import EditarPerfil  from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword"
import RutaProtegida from "./layout/RutaProtegida";




import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import AdminPacientes from "./pages/AdminPacientes";


const App = () => {
  return ( 
    <BrowserRouter>
      <AuthProvider>
      <PacientesProvider>
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="confirmar/:token" element={<ConfirmarCuenta/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
            </Route>

            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdminPacientes/>}/>
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPassword/>}/>

            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;