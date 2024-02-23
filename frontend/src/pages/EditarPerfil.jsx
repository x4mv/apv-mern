import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";
const EditarPerfil = () => {

    const { auth} = useAuth();
    const {actualizarDatosPerfil} = usePacientes();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({})
    

    useEffect(() => {

        setPerfil(auth);

    },[auth])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const {nombre, email} = perfil

        if ([nombre.trim(), email.trim()].includes('')){
            setAlerta({
                msg: 'No se pueden dejar campos vacios',
                error: true
            })
            return;
        }

        const msgRta = await actualizarDatosPerfil(perfil)

        
        setAlerta(msgRta)


        
    }

    const { msg } = alerta 
    return (
        <>
            <AdminNav/>
            <h2 className="font-black text-3xl text-center mt-10 ">Editar Perfil</h2>
            <p className="text-xl mt-5 text-center mb-10">Modifica tu {" "}
            <span className=" text-indigo-600 font-bold">Informacion</span></p>

            <div className="flex justify-center">
                <div className="2-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                    {msg && <Alerta alerta={alerta} />}
                    <form
                    onSubmit={handleSubmit}
                    >
                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                                value={perfil.nombre || ''}
                                // ingresamos a la propiedad nombre del objeto perfil y sobreescribimos de manera dinamica el objeto
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                                
                            />
                        </div>

                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"
                                value={perfil.web || ''}
                                // ingresamos a la propiedad nombre del objeto perfil y sobreescribimos de manera dinamica el objeto
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Telefono</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="telefono"
                                value={perfil.telefono || ''}
                                // ingresamos a la propiedad nombre del objeto perfil y sobreescribimos de manera dinamica el objeto
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input 
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"
                                value={perfil.email || ''}
                                // ingresamos a la propiedad nombre del objeto perfil y sobreescribimos de manera dinamica el objeto
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase 
                            w-full mt-5 cursor-pointer hover:bg-indigo-700"
                        />

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil