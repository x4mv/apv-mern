import Veterinario from "../models/Veterinario.js";


const registrar = async (req, res) =>{

    
    //extrayendo los datos enviados desde el metodo post
    //const {nombre, email, password} = req.body;

    try {

        // guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado);

    } catch (error) {
        console.log(error);
    }

    
}

const perfil = (req, res) =>{
    res.json({msg: 'MOSTRANDO PERFIL TLACUA'});
}


export {
    registrar,
    perfil
}