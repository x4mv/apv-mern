import  express  from "express"; // framework para conectar bd
import dotenv from 'dotenv' // escanea el proyecto y lee las env
import conectarDB from "./config/db.js"; // fn para conectarse a la bd
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js"


const app = express();
app.use(express.json());


// leyendo el archivo env
dotenv.config()

// conectando a la db 
conectarDB()

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

// add env to choose the right port when deployment

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`FUNCIONA LA BD APA en el puerto ${PORT}` );
});