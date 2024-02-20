import  Jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";
const checkAuth = async (req, res, next) => {

    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);

            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado")

            return next();
        } catch (errors) {
            const error = new Error('Token no valido');
            return res.status(403).json({msg: error.message});
        }

    }

    if (!token){
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({msg: error.message});
    }

    next();
};

export{
    checkAuth
}