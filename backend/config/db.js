import mongoose from 'mongoose'; // dependencia para conectarse a la db


const conectarDB = async () => {

    try {
        
        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`Mongo DB conectado en: ${url}`)

    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }


}


export default conectarDB;