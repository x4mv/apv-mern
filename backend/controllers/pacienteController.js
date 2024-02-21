// importamos el modelo para poder mandar a hacer las peticiones 
import Paciente from '../models/Paciente.js';


const agregarPacientes = async (req, res, next) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteGuardado = await paciente.save()
        res.json({pacienteGuardado})
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }
}

const obtenerPacientes = async ( req, res, next ) => {
    
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes)

    return next();

}

const obtenerPacientesById = async (req, res, next) => {
    
    const { id } = req.params;

    const paciente = await Paciente.findOne({_id: id}).where('veterinario').equals(req.veterinario);
    
    if (paciente === null ){
        res.json({msg: 'No se ha encontrado un paciente con ese id'})
        return next();
    }

    res.json({paciente})
    return next();
}

const actualizarPaciente = async (req, res, next) => {
    
    // verificamos si existe el paciente
    
    const { id } = req.params;

    const paciente = await Paciente.findOne({_id: id}).where('veterinario').equals(req.veterinario);
    
    if (paciente === null ){
        res.json({msg: 'No se ha encontrado un paciente con ese id'})
        return next();
    }

    // actualizamos los datos del paciente
    const { nombre, propietario, email, fecha, sintomas} = req.body;
    paciente.nombre = nombre || paciente.nombre;
    paciente.propietario = propietario || paciente.propietario;
    paciente.email = email || paciente.email;
    paciente.fecha = fecha || paciente.fecha;
    paciente.sintomas = sintomas || paciente.sintomas;


    try {
        const pacienteActualizado = await paciente.save()
        res.json({pacienteActualizado})
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }
}

const eliminarPaciente = async (req, res, next) => {

     // verificamos si existe el paciente

    const { id } = req.params;

    const paciente = await Paciente.findOne({_id: id}).where('veterinario').equals(req.veterinario);
    
    if (paciente === null ){
        res.json({msg: 'No se ha encontrado un paciente con ese id'})
        return next();
    }

    try {
        await paciente.deleteOne();
        res.json({msg:"paciente eliminado"})
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }

    
}


export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPacientesById,
    actualizarPaciente,
    eliminarPaciente
}