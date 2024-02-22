import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido , setTokenValido ] = useState(false);
    const [paswdModificado, setPswdModificado] = useState(false);

    const params = useParams();
    
    const {token} = params ;

    useEffect(()=>{
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg:'Coloca tu nuevo password',
                    error: false
                })
                setTokenValido(true);
                
            } catch (error) {
                console.log(error)
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        // validar que no se dejen campos vacios
        if(password.trim() === ''){
            setAlerta({
                msg:'No se pueden dejar campos Vacios',
                error: true
            })
            return;
        }

        // validar si las passwords son iguales
        if (password !== newPassword ){
            setAlerta({
                msg: 'Las passwords no coinciden',
                error: true,
            })
            return;
        }

        // validar que las passwords no sea muy cortas 
        if(password.length < 6 ){
            setAlerta({
                msg: 'La password es muy corta',
                error: true,
            })
            return;
        }

        // reestableciendo password
        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, {password});
            console.log(data)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setPswdModificado(true)
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        console.log('restableciendo pass...')
    }

    const {msg } = alerta

    return (
        <>

        <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Reestablece tu Password y Administra tus{" "}<span className="text-black">pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {msg && <Alerta alerta={alerta} /> }
                
                { tokenValido && (
                    <>

                            
                            <form
                            onSubmit={handleSubmit}
                            >
                                <div className="my-5">
                                    <label className=" text-gray-600 block text-xl font-bold">
                                        Nueva Password
                                    </label>
                                    <input 
                                        type='password'
                                        placeholder="******"
                                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                        value={password}
                                        onChange={ e => setPassword(e.target.value)}


                                    />
                                </div>

                                <div className="my-5">
                                    <label className=" text-gray-600 block text-xl font-bold">
                                        Confirmar Nueva Password
                                    </label>
                                    <input 
                                        type='password'
                                        placeholder="******"
                                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                        value={newPassword}
                                        onChange={ e => setNewPassword(e.target.value)}

                                    />
                                </div>
                                <input 
                                    type='submit'
                                    value='Reestablecer Password'
                                    className="bg-indigo-700 w-full font-bold mt-5 
                                    hover:cursor-pointer hover:bg-indigo-800 rounded
                                    text-white py-3 px-10 uppercase md:w-auto"
                                />

                            </form>

                            { paswdModificado && <Link to='/'
                            className="block my-3 text-gray-500 mt-10"
                            >Iniciar Sesion</Link>}

                    </>
                )}
                
                
                
                
            </div>

        </>
    )
}

export default NuevoPassword