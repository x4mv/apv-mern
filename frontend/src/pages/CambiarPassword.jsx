import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";


const CambiarPassword = () => {


        const { guardarPasswordNueva} = useAuth();
        const [alerta, setAlerta] = useState({})
        const [ password , setPassword] = useState({
            passwordActual: '',
            passwordNueva: '',
            passwordConfirmar: ''
        });
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { passwordActual, passwordNueva, passwordConfirmar} = password;

        // verificando que todos los campos son obligatorios
        if ( Object.values(password).some(pass => pass === '')){
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return;
        }

        // llamado para comprobar si la password actual esta en la bd 


        if (passwordActual?.length < 6 || passwordNueva?.length < 6){
            setAlerta({msg: 'La password es muy corta', error: true})
            return;
        }

        if (passwordNueva !== passwordConfirmar ){
            setAlerta({msg: 'La password nueva no coinciden', error: true})
            return;
        }

        // mostrando mensaje de error o exito
        setAlerta(await guardarPasswordNueva(password))




    }

    const { msg } = alerta ;

    return (
        <>
            <AdminNav/>
            <h2 className="font-black text-3xl text-center mt-10 ">Cambiar Password</h2>
            <p className="text-xl mt-5 text-center mb-10">Modifica tu {" "}
            <span className=" text-indigo-600 font-bold">Password</span></p>

            <div className="flex justify-center">
                <div className="2-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                    {msg && <Alerta alerta={alerta} />}
                    <form
                    onSubmit={handleSubmit}
                    >
                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input 
                                type="password"
                                placeholder="Escribe tu password actual"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="passwordActual"
                                
                                onChange={(e) => 
                                    setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value
                                    })}
                            />
                        </div>

                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Nueva Password</label>
                            <input 
                                type="password"
                                placeholder="Escribe tu nueva password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="passwordNueva"
                                
                                onChange={(e) => 
                                    setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value
                                    })}
                            />
                        </div>

                        <div className="my-3" >
                            <label className="uppercase font-bold text-gray-600">Confirmar Nueva Password</label>
                            <input 
                                type="password"
                                placeholder="Confirma tu nueva password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="passwordConfirmar"
                                
                                onChange={(e) => 
                                    setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value
                                    })}
                                
                            />
                        </div>
                        
                        <input 
                            type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase 
                            w-full mt-5 cursor-pointer hover:bg-indigo-700"
                        />

                    </form>
                </div>
            </div>
    
        </>
    )
}

export default CambiarPassword