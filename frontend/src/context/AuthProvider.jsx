import {  useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";




const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ auth , setAuth ] = useState({})
    const [cargando , setCargando ] = useState(true)

    useEffect(() => {
        
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')

            if (!token){
                setCargando(false);
                return;
            }

            const config = {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }
            // autenticando usuario y entrando al perfil

            try {
                const {data } = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
                
            }

            setCargando(false)
        
        }
        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({})
        
    }
    
    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider
}

export default AuthContext;