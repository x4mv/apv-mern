import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
    const params = useParams()

    const {token} = params

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});


    useEffect(() => {
        const confirmarCuenta =  async () => {
            try {
                
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${token}`
                const { data } = await axios(url);
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true);


            } catch (error) {
                console.log(error);
                setAlerta({msg: error.response.data.msg, error: true});
            }

            setCargando(false)
        }

        confirmarCuenta();
    }, [])

    return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirma tu cuenta y comienza a Administrar tus{" "}<span className="text-black"> Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            { !cargando &&  <Alerta 
                    alerta={alerta}
            />}

            {
                cuentaConfirmada && (
                    <Link to='/'
                    className="block my-3 text-gray-500 text-center"
                    >Iniciar Sesion</Link>
                ) 
            }


        </div>
            
    </>
    )
}

export default ConfirmarCuenta