import  express  from "express"; // framework para conectar bd
import dotenv from 'dotenv' // escanea el proyecto y lee las env
import cors from 'cors'; // importando cors para permitir enviar peticiones deste port 3K => 4k y proteger api
import conectarDB from "./config/db.js"; // fn para conectarse a la bd
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js"


const app = express();
app.use(express.json());


// leyendo el archivo env
dotenv.config()

// conectando a la db 
conectarDB();

const dominiosPermitidos = ['http://localhost:5173']

const corsOptions = {
    origin: function(origin, callback){
        // origin es la url en el arreglo 
        // si la url esta en el arreglo, entonces si puede hacer peticiones a la api
        if (dominiosPermitidos.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('No permitido por Cors'));
        }
    }
}
app.use(cors(corsOptions));
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

// add env to choose the right port when deployment

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`FUNCIONA LA BD APA en el puerto ${PORT}` );
});