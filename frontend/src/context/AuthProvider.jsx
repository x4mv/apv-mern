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

    const guardarPasswordNueva = async (datos) => {
        
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

        try {
            const url = '/veterinarios/actualizar-password'
            const { data } = await clienteAxios.put(url, datos, config)
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg : error.response.data.msg,
                error: true
            }
            
        }
    }
    
    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                guardarPasswordNueva
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider
}

export default AuthContext;