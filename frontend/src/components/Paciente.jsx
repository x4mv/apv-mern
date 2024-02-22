
const Paciente = ({paciente}) => {
    
    const { nombre, propietario, email, fecha, sintomas} = paciente
    return (
        <div>
            <p>{nombre}</p>
            <p>{propietario}</p>
            <p>{email}</p>
            <p>{fecha.substr(0,10)}</p>
            <p>{sintomas}</p>
            <p>======</p>
        </div>
    )
}

export default Paciente