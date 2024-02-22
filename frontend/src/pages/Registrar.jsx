import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {

        // validar que no se dejen campos vacios
        e.preventDefault()
        if ( [ nombre, email, password, confirmarPassword].includes("")){
            setAlerta({msg: 'hay campos vacios', error: true});
            return;
        }

        // validando que las passwords sean iguales

        if (password !== confirmarPassword){
            setAlerta({msg: 'Las passwords no coinciden', error: true});
            return;
        }

        // validando que los password sean mayor a 6 caracteres

        if(password.length <6){
            setAlerta({msg: 'La password es muy corta', error: true});
            return;
        }

        setAlerta({})

        // creando el usuario en la api
        
        try {
            const url = '/veterinarios';
            await clienteAxios.post(url, {
                nombre,
                email,
                password
            });

            setAlerta({msg: 'Creado correctamente, revisa tu email', error:false});
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error:true})
        }


        
    }
     // verificando si hay o no algun mensaje 
    const { msg } = alerta;
    
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu cuenta y  Administra tus{" "}<span className="text-black"> pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
            
                { msg && <Alerta alerta={alerta}/> }
                
                
                
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input 
                            type='text'
                            placeholder="Ingrese su nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange = { e => setNombre(e.target.value)}

                        />
                    </div>

                    <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type='email'
                            placeholder="ejemplo@ejemplo.com"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange = { e => setEmail(e.target.value)}

                        />
                    </div>

                    {/* <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Telefono
                        </label>
                        <input 
                            type='Telefono'
                            placeholder="(+595) xxx-xxx-xxx"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div>

                    <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Web
                        </label>
                        <input 
                            type='text'
                            placeholder="https://example.com"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        />
                    </div> */}

                    <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input 
                            type='password'
                            placeholder="*******"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange = { e => setPassword(e.target.value)}

                        />
                    </div>

                    <div className="my-5">
                        <label className=" text-gray-600 block text-xl font-bold">
                            Confirmar Password
                        </label>
                        <input 
                            type='password'
                            placeholder="*******"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={confirmarPassword}
                            onChange = { e => setConfirmarPassword(e.target.value)}

                        />
                    </div>
                    <input 
                        type='submit'
                        value='Registrar Cuenta'
                        className="bg-indigo-700 w-full font-bold mt-5 
                        hover:cursor-pointer hover:bg-indigo-800 rounded
                        text-white py-3 px-10 uppercase md:w-auto"
                    />

                </form>

                <nav className="mt-5 grid grid-rows-2 gap-2">
                    <Link to='/'
                    className="block my-3 text-gray-500"
                    >Ya tienes una cuenta? Ingresa Aqui!</Link>
                    <Link to='/olvidePassword'
                    className="block my-3 text-gray-500"
                    >Olvide mi password</Link>
                </nav>
                
            </div>
        </>
    )
}

export default Registrar