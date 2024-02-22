import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({children}) =>{

    const [ pacientes , setPacientes] = useState([])

    // listando los pacientes nada mas cargar la pagina
    useEffect( () => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return 

                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data } = await clienteAxios('/pacientes', config)
                setPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [])

    //agregando un nuevo paciente a la bd

    const guardarPaciente = async (paciente) => {
        try {

            const token = localStorage.getItem('token');
            
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/pacientes', paciente, config )
            // hace un destructuring y crea un objeto sin las propiedades de enfrente
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data.pacienteGuardado 

            console.log('almacena ', pacienteAlmacenado)
            setPacientes([pacienteAlmacenado, ...pacientes])
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <PacientesContext.Provider 
            value={{
                pacientes,
                guardarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
};

export{
    PacientesProvider
}


export default PacientesContext;