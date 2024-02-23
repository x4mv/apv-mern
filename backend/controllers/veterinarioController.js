import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarjwt.js";
import { generarToken } from "../helpers/generarToken.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

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
    res.json(veterinario);
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
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        });
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

        // enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: usuario.nombre,
            token: usuario.token
        });

        res.json({msg: 'Revisa tu inbox apa'})
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

const actualizarPerfil = async (req, res, next) => {

    const veterinario = await Veterinario.findById(req.params.id);

    if (!veterinario){
        const error = new Error('No existe el veterinario' )
        res.status(400).json({msg:error.message})
        return next();
    }

    const {email} = req.body
    if (veterinario.email !== req.body.email){
        const existeEmail = await Veterinario.findOne({email})
        if ( existeEmail){
            const error = new Error('El correo ya esta registrado apa');
            res.status(401).json({msg: error.message});
            return next();
        }
    }

    try {
        veterinario.nombre = req.body.nombre;
        veterinario.email = req.body.email;
        veterinario.telefono = req.body.telefono
        veterinario.web = req.body.web;

        const veterinarioActualizado = await veterinario.save()

        res.json(veterinarioActualizado);
        return next();
    } catch (error) {
        console.log(error)
        return next();
    }


}


const actualizarPassword = async (req, res, next) => {

    // leer los datos 

    // veterniario 
    const { _id } = req.veterinario;

    // passwords
    const { passwordActual, passwordNueva } = req.body;

    //comprobar que veterinario exista
    const veterinario = await Veterinario.findById(_id);

    if (!veterinario){
        const error = new Error('No existe el veterinario' )
        res.status(400).json({msg:error.message})
        return next();
    }

    //comprobar el password

    if(await veterinario.comprobarCredenciales(passwordActual)){
        // almacenar el new pass

        veterinario.password = passwordNueva;
        await veterinario.save()

        res.json({msg:'La password ah sido actualizada con exito'})
        return next();
    }else{
        const error = new Error('La password actual es incorrecta' )
        res.status(400).json({msg:error.message})
        return next();
    }

    //almacenar el new pass
}
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
}