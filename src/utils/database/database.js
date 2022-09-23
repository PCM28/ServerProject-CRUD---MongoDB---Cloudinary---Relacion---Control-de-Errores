const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL;
//Si quieres cambiar la base de datos local -> nube o al revés. En .env cololcar luego de 'DB_URL='
//mongodb+srv://pcm:iO321yhFxTbiXquS@cluster0.nbvahes.mongodb.net/ServerProject?retryWrites=true&w=majority -> cluster creado, si lo quieres en la nube (Luego de los 3 cambios)
//mongodb://localhost:27017/serverProject-CRUD-Relacion(luego de '27017/' pones el nombre que quieras de tu base de datos creara) -> si lo quieres en local (Compass)
const connectDb = async () => {
    try{
        const db = await mongoose.connect(DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        const {name, host} = db.connection;
        console.log(`Connected with db ${name} in host ${host}`);
    }catch(error){
        console.log(`Error connecting to MongoDB: ${error}`);
    }
}
module.exports = {connectDb, DB_URL};