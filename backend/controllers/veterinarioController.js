import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarjwt.js";
import { generarToken } from "../helpers/generarToken.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) =>{

    
    //extrayendo los datos enviados desde el metodo post
    const {nombre, email, password} = req.body;
    
    // revisar si ya existe un usuario 
    const existeUsuario = await Veterinario.findOne({email});

    if (existeUsuario){

        // generar un error para que no se ejecute mas el programa una vez existe el user
        const error = new Error('YA EXISTE EL USUARIO APAA');
        return res.status(400).json({msg : error.message});
    }



    try {

        // guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // enviar el email con el token
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.json(veterinarioGuardado);

    } catch (error) {
        console.log(error);
    }

    
}

const perfil = (req, res) =>{

    const { veterinario } = req;
    res.json({veterinario});
}

const confirmar = async ( req, res ) => {

    const {token} = req.params;

    // verificamos si el token existe 
    const usuarioConToken = await Veterinario.findOne({token});

    if (!usuarioConToken){
        const noToken = new Error('El token no existe APA!!!');
        return res.status(404).json({msg: noToken.message});
    }

    // si el token existe, entonces eliminamos el token, y confirmamos el usuario como usario confimado
    try {
        
        usuarioConToken.token = null;
        usuarioConToken.confirmado = true;

        await usuarioConToken.save()

        res.json({msg: "Usuario confirmado"})
        
    } catch (error) {
        console.log(error);
    }

    
}

const autenticar = async (req, res, next) => {

    //extrayendo los datos que llegan al body 
    const { email, password} = req.body;

    // primero tenemos que confirmar que el usuario(email) exista 
    const usuario = await  Veterinario.findOne({email});
    if (!usuario){
        const noToken = new Error('El USUARIO NO EXISTE APA');
        res.status(401).json({msg: noToken.message});
        return next();
    }

    // segundo tenemos que verificar si el usuario esta confirmado
    if (!usuario.confirmado){
        const noConfirmado = new Error('FALTA CONFIRMAR EL USUARIO APA');
        res.status(401).json({msg: noConfirmado.message});
        return next();
    }
    

    // Revisar el pswd
    if( await usuario.comprobarCredenciales(password)){
        res.json({id:generarJWT(usuario.id)});
    }else{
        const wrongPass = new Error('Password incorrecto APA')
        return res.status(403).json({msg: wrongPass.message});
    }

    
}

const olvidePassword = async (req, res, next) => {

    const {email} = req.body;


    const usuario = await Veterinario.findOne({email});

    if (!usuario){
        const noToken = new Error('El Veterinario NO EXISTE APA');
        res.status(404).json({msg: noToken.message});
        return next();
    }
    

    try {
        usuario.token = generarToken();
        await usuario.save()
        res.json({msg: 'Hemos enviado un email con las instrucciones'})
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }

    
        
    



}

const comprobarToken = async (req, res, next) => {

    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if (!tokenValido){
        const noToken = new Error('El TOKEN NO ES VALIDO APA');
        res.status(401).json({msg: noToken.message});
        return next();
    }


    res.json({msg: token});
    return next();
} 

const nuevoPassword = async( req, res, next) => {

    const { token } = req.params;

    const { password } = req.body;

    const veterinario = await Veterinario.findOne({token});

    if (!veterinario){
        const noToken = new Error('Hubo un error');
        res.status(401).json({msg: noToken.message});
        return next();
    }

    try {
        veterinario.token = null;
        veterinario.password = password;

        await veterinario.save()

        res.json({msg: 'PSWD modificado successfully apa'});
    } catch (error) {
        console.log(error)
    }

}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}