import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";



const Formulario = () => {

    const [ nombre, setNombre ] = useState('')
    const [ propietario, setPropietario ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ fecha, setFecha ] = useState('')
    const [ sintomas, setSintomas ] = useState('')


    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes();


    // verificando si esta en modo edicion 

    useEffect(() => {

        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha.substr(0,10))
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
        
    }, [paciente])



    const handleSubmit = (e) => {
        e.preventDefault()

        //validar formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', 
        error: true});
        return;
        }


        guardarPaciente({
            nombre, propietario, email, fecha, sintomas, id
        })
        setAlerta({msg: 'Guardado correctamente'})

        // reiniciando los campost una vez se termine el proceso 
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
        
}

    const { msg } = alerta 

    return (
        <>
            <p className="text-lg text-center mb-10">
                Añade tus pacientes y {" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
            onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                    className="text-gray-700 font-bold uppercase"
                    htmlFor="nombre">Nombre de la Mascota</label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 placeholder-gray-400 
                        rounded-md mt-3"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                    className="text-gray-700 font-bold uppercase"
                    htmlFor="propietario">Nombre de la propietario</label>
                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre de la propietario"
                        className="border-2 w-full p-2 placeholder-gray-400 
                        rounded-md mt-3"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                    className="text-gray-700 font-bold uppercase"
                    htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 placeholder-gray-400 
                        rounded-md mt-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                    className="text-gray-700 font-bold uppercase"
                    htmlFor="fecha">Fecha de Alta</label>
                    <input 
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 placeholder-gray-400 
                        rounded-md mt-3"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label 
                    className="text-gray-700 font-bold uppercase"
                    htmlFor="email">sintomas</label>
                    <textarea 
                        id="sintomas"
                        placeholder="sintomas"
                        className="border-2 w-full p-2 placeholder-gray-400 
                        rounded-md mt-3"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value) }
                    />
                </div>

                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white upppercase
                    font-bold hover:bg-indigo-700 mt-3 cursor-pointer
                    transition-colors"
                    value={id ? 'Editar Paciente ' : 'Agregar Paciente'}
                />
            </form>

            { msg && <Alerta alerta={alerta} />}

        </>
        
    )
}

export default Formulario