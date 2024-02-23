import usePacientes from "../hooks/usePacientes"
const Paciente = ({paciente}) => {
    
    const { nombre, propietario, email, fecha, sintomas, _id} = paciente

    const { setEdicion, eliminarPaciente } = usePacientes();


    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle:'long'}).format(nuevaFecha)

    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md  rounded-md rounded-xl px-5 py-10 ">
            <p className="font-bold uppercase text-indigo-700 mb-4"> Nombre: {" "}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>

            <p className="font-bold uppercase text-indigo-700 mb-4"> Propietario: {" "}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>

            <p className="font-bold uppercase text-indigo-700 mb-4"> Email: {" "}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>

            <p className="font-bold uppercase text-indigo-700 mb-4"> Fecha de alta: {" "}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
            </p>

            <p className="font-bold uppercase text-indigo-700 mb-4"> Sintomas: {" "}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between my-5 ">
                <button 
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700
                text-white uppercase font-bold rounded-lg"
                onClick={() => setEdicion(paciente) }
                >Editar</button>

                <button
                className="py-2 px-10 bg-red-600 hover:bg-red-700
                text-white uppercase font-bold rounded-lg"
                onClick={() => eliminarPaciente(_id, nombre)}
                >Eliminar</button>
            </div>
            
            
        </div>
    )
}

export default Paciente