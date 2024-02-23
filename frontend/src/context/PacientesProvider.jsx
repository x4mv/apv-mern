import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useAuth from '../hooks/useAuth'
const PacientesContext = createContext();

const PacientesProvider = ({children}) =>{

    const [ pacientes , setPacientes] = useState([])
    const [ paciente, setPaciente ] = useState({})
    const { auth } = useAuth()
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
    }, [auth])

    //agregando un nuevo paciente a la bd

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id ){
            //si ya tiene un id definido entonces tenemos que editar
            
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente, config)
                
                const pacientesAcutalizado = pacientes.map( pacienteState => data.pacienteActualizado._id === pacienteState._id ? data.pacienteActualizado : pacienteState )
                
                setPacientes(pacientesAcutalizado)
                
                

            } 
            catch (error) {
                console.log(error)
            }
        }else{ 
            // si no tiene un id definido tenemos que agg a la bd 
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config )
                // hace un destructuring y crea un objeto sin las propiedades de enfrente
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data.pacienteGuardado 
    
                setPacientes([pacienteAlmacenado, ...pacientes])
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id, nombre) => {
        
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const confimar = confirm(`Estas seguro que deseas eliminar a ${nombre}`)

        if (confimar){
            try {
                await clienteAxios.delete(`/pacientes/${id}`, config);
                // sincronizando el state
                const pacientesAcutalizado = pacientes.filter( pacienteState => pacienteState._id !== id)
                setPacientes(pacientesAcutalizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const actualizarDatosPerfil = async (datos) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            await clienteAxios.put(url, datos, config)
            return {
                msg:'almacenado correctamente',
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <PacientesContext.Provider 
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
                actualizarDatosPerfil,
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